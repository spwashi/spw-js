import {ComponentDescription, ConstructReductionConfig, ConstructReductionOptions, InteractionContext} from '@constructs/ast/_abstract/_types';

export function completeConfig(options: ConstructReductionOptions = {}): ConstructReductionConfig {
    const {
              evaluator      = () => null,
              reducer        = (_, next) => next,
              stepNormalizer = (_: any, [v, c]) => {
                  return [Array.isArray(v) ? v.pop() : v, c] as [typeof v, InteractionContext]
              },
          } = options;

    return {
        reducer,
        evaluator,
        stepNormalizer,
    };
}

type LifecycleStepType =
    'begin-reduction'
    | 'eval';

type LifecycleStep = {
    type: LifecycleStepType,
    [k: string]: any
};
type ReductionLifecycleController = (lifecycleStep: LifecycleStep) =>
    ((generatorStart?: any) => Generator<any>);

export function reduceConstruct<Subject, StartType, Intermediate, ReturnType, Context extends InteractionContext | null = InteractionContext>(
    subject: Subject | null,
    config: ConstructReductionConfig,
    seed: [StartType | null, Context | null]   = [null, null],
    prototypes: Iterable<ComponentDescription> = [],
    lifecycle: ReductionLifecycleController    =
        ({type}) => {
            switch (type) {
                case 'eval':
                case 'begin-reduction':
                default:
                    return function* (s) { yield s; }
            }
        },
): [ReturnType, Context] {
    lifecycle({type: 'begin-reduction', seed, subject})

    const isContext = (i: any): i is Context => !!i;
    function processComponent(
        prototype: ComponentDescription,
        [, context]: [any, Context],
    ): [Intermediate[], Context] {
        const component          = prototype.selector(subject);
        const componentGenerator = prototype.generator(component, context);
        let yieldedItems         = [] as Intermediate[];
        type _Step =
            [Intermediate, Context]
            | Context;

        let nextContext: Context | null = null,
            done                        = false;


        while (!done) {
            const out = componentGenerator.next() as IteratorYieldResult<_Step>;

            done = !!out.done;
            if (done) {
                nextContext = out.value as Context;
                break;
            }

            const next    = out.value as [Intermediate, Context];
            const key     = prototype.name;
            const mutated = config.evaluator(next[0], key, next[1], false);


            const startEvalGenerator = lifecycle({type: 'eval'});
            const lifecycleGenerator = startEvalGenerator([mutated, context]);

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

        return [
            yieldedItems as Intermediate[],
            isContext(nextContext) ? nextContext
                                   : context,
        ];
    }

    let lastStep: [any, Context] = seed as [StartType, Context];
    for (const prototype of prototypes) {
        const step       = processComponent(prototype, lastStep);
        const normalized = config.stepNormalizer(prototype, step) as [ReturnType, Context];
        lastStep         = config.reducer(lastStep, normalized, false) as [Intermediate, Context] | [ReturnType, Context];
    }
    return lastStep;
}

export async function reduceConstructAsync<Subject, StartType, ReturnType, Intermediate, Context extends InteractionContext = InteractionContext>(
    subject: Subject,
    config: ConstructReductionConfig,
    seed: [StartType | null, Context | null]   =
        [null, {} as Context],
    prototypes: Iterable<ComponentDescription> =
        [],
    lifecycle: ReductionLifecycleController    =
        ({type}) => {
            switch (type) {
                case 'eval':
                case 'begin-reduction':
                default:
                    return function* (s) { yield s; }
            }
        },
): Promise<[ReturnType, Context]> {
    const startBeginGenerator = await lifecycle({type: 'begin-reduction', seed, subject});
    for (const out of startBeginGenerator()) {
        if (out === false) {
            throw new Error('this is not yet handled');
        }
    }

    async function processComponent(
        prototype: ComponentDescription,
        [, context]: [any, Context],
    ): Promise<[Promise<Promise<Intermediate[]>>, Context]> {
        const component     = prototype.selector(subject);
        const generator     = prototype.asyncGenerator?.(component, context) ?? (async function* () { yield; })();
        const subComponents = [] as unknown as (Promise<Intermediate[]>)[];

        let nextContext: Context = context;
        async function startPromise() {
            for (let promise; (promise = generator.next());) {
                const {value, done} = await promise;
                if (done) {
                    nextContext = value ? value as Context
                                        : nextContext as Context;
                    break;
                }
                if (typeof value === 'undefined') {
                    continue;
                }
                if (!Array.isArray(value)) {
                    nextContext = value as Context;
                    break;
                }
                const [item, ctxt]       = value;
                const mutated            = await config.evaluator(item, prototype.name, ctxt, true)
                const startEvalGenerator = lifecycle({type: 'eval'});
                const lifecycleGenerator = startEvalGenerator([mutated, ctxt]);

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

                    subComponents.push(val)

                    nextContext = ctxt;
                }
            }
            return subComponents;
        }

        const step =
                  [
                      Promise.resolve(startPromise()),
                      nextContext ?? context,
                  ];
        return step as [Promise<Promise<Intermediate[]>>, Context];
    }
    const promise =
              (async function promise_iife(): Promise<[ReturnType, Context]> {
                  let promised: [any, Context] =
                          seed as [any, Context];

                  for await(const prototype of prototypes) {
                      const step       = await processComponent(prototype, promised);
                      const resolved   = [await step[0], step[1]] as [Intermediate[], Context];
                      const normalized = config.stepNormalizer(prototype, resolved) as [ReturnType, Context];
                      const previous   = await promised;
                      promised         = await config.reducer(previous, normalized, true) as [ReturnType, Context];
                  }

                  return promised;
              })();

    return promise;
}