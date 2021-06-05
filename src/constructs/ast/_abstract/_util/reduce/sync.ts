import {ComponentDescription, ConstructReductionConfig, InteractionContext} from '@constructs/ast/_abstract/_types';
import {ReductionLifecycleController} from '@constructs/ast/_abstract/_util/reduce/_/types';
import {defaultLifecycleGenerator} from '@constructs/ast/_abstract/_util/reduce/_/util';

/**
 * Reduce a construct synchronously
 *
 * @param subject
 * @param config
 * @param seed
 * @param prototypes
 * @param lifecycle
 */
export function reduceConstructSync<Context extends InteractionContext = InteractionContext,
    Subject = any,
    StartType = any | null,
    Intermediate = any,
    ReturnType = any,
    >(
    subject: Subject | null,
    config: ConstructReductionConfig<Context>,
    seed: [StartType | null, Context | null]            = [null, null],
    prototypes: Iterable<ComponentDescription<Context>> = [],
    lifecycle: ReductionLifecycleController             = defaultLifecycleGenerator,
): [ReturnType, Context] {
    lifecycle({
                  type:    'begin-reduction',
                  context: seed[1],
                  payload: subject,
              })

    const isContext = (i: any): i is Context => !!i;

    let lastStep: [any, Context] = seed as [StartType, Context];

    for (const prototype of prototypes) {
        const [, context]        = lastStep;
        const component          = prototype.selector(subject);
        const componentGenerator = prototype.generator(component, context);
        let yieldedItems         = [] as Intermediate[];
        type _Step =
            [Intermediate, Context]
            | Context;

        let nextContext: Context | null = null,
            done                        = false;

        /**
         * Loop over the prototype's componentGenerator until it stops yielding values
         */
        while (!done) {
            const out = componentGenerator.next() as IteratorYieldResult<_Step>;

            // break if done
            done = !!out.done;
            if (done) {
                nextContext = out.value as Context;
                break;
            }

            // init vars
            const next    = out.value as [Intermediate, Context];
            const key     = prototype.name;
            const mutated = config.evaluator(next[0], key, next[1], false);

            // init generator
            const startEvalGenerator = lifecycle({type: 'eval'});
            const lifecycleGenerator = startEvalGenerator([mutated, context]);

            // loop over generator
            for (
                let value, done;
                ({value, done} = lifecycleGenerator.next()), !done;
            ) {
                if (value === undefined) {
                    continue;
                }
                if (value === false) {
                    // break outerGenerator;
                }
                const [val, ctxt] = value;

                yieldedItems = [...yieldedItems, val]
                nextContext  = ctxt;
            }
        }

        // normalize output
        const normalized =
                  config.stepNormalizer(
                      prototype,
                      [
                          yieldedItems as Intermediate[],
                          isContext(nextContext) ? nextContext : context,
                      ] as [Intermediate[], Context],
                  ) as [ReturnType, Context];

        lastStep = config.reducer(lastStep, normalized, false) as [Intermediate, Context] | [ReturnType, Context];
    }

    lifecycle({
                  type:    'end-reduction',
                  context: lastStep[1],
                  payload: lastStep[0],
              })

    return lastStep;
}
