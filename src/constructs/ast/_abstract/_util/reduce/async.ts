import { ConstructReductionConfig } from '@constructs/ast/_abstract/_types';
import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';
import { ReductionLifecycleController } from '@constructs/ast/_abstract/_util/reduce/_/types';
import { getInternalComponentDescriptions } from '@constructs/ast/_abstract/_util/reduce/getInternalComponentDescriptions';
import { defaultLifecycleGenerator } from './_/util';

function getGeneratorFromComponent<Context extends InteractionContext>(
  prototype: ComponentDescription<Context>,
  component: any,
  context: Context,
) {
  return (
    prototype.asyncGenerator?.(component, context) ??
    (async function* () {
      yield;
    })()
  );
}
/**
 * Reduce a construct asynchronously
 *
 * @param subject
 * @param config
 * @param seed
 * @param prototypes
 * @param lifecycle
 */
export async function reduceConstructAsync<
  Context extends InteractionContext = InteractionContext,
  Subject = any,
  StartType = any,
  ReturnType = any,
  Intermediate = any,
>(
  subject: Subject | null,
  config: ConstructReductionConfig<Context>,
  seed: [StartType | null, Context | null] = [null, null],
  prototypes: Iterable<ComponentDescription<Context>> = [],
  lifecycle: ReductionLifecycleController = defaultLifecycleGenerator,
): Promise<[ReturnType, Context]> {
  const startBeginGenerator = await lifecycle({
    type: 'begin-reduction',
    seed,
    subject,
  });
  for (const out of startBeginGenerator()) {
    if (out === false) {
      throw new Error('this is not yet handled');
    }
  }

  async function internalReduceConstructAsync(): Promise<[ReturnType, Context]> {
    let promised: [any, Context] = seed as [any, Context];

    const componentDescriptions = [
      ...getInternalComponentDescriptions(),
      ...prototypes,
    ] as Iterable<ComponentDescription<Context>>;

    for await (const description of componentDescriptions) {
      const [, context] = promised;
      const component = description.selector(subject);
      const generator = getGeneratorFromComponent(description, component, context);

      const subComponents = [] as unknown as Promise<Intermediate[]>[];

      let nextContext: Context = context;
      const startPromise = async function () {
        for (let promise; (promise = generator.next()); ) {
          const { value, done } = await promise;
          if (done) {
            nextContext = value ? (value as Context) : (nextContext as Context);
            break;
          }
          if (typeof value === 'undefined') {
            continue;
          }
          if (!Array.isArray(value)) {
            nextContext = value as Context;
            break;
          }
          const [item, ctxt] = value;
          const mutated = await config.getValueFromSubject(item, description.name, ctxt, true);
          const startEvalGenerator = lifecycle({ type: 'eval' });
          const lifecycleGenerator = startEvalGenerator([mutated, ctxt]);

          for (let value, done; ({ value, done } = lifecycleGenerator.next()), !done; ) {
            if (value === undefined) {
              continue;
            }

            const [val, ctxt] = value;

            subComponents.push(val);

            nextContext = ctxt;
          }
        }
        return subComponents;
      };

      const step = [
        (await startPromise()) as any as Promise<Intermediate[]>,
        nextContext ?? (context as Context),
      ] as [Promise<Intermediate[]>, Context];

      const resolved = [await step[0], step[1]] as [Intermediate[], Context];
      const normalized = config.normalizeComponentReductionValues(description, resolved) as [
        ReturnType,
        Context,
      ];
      const previous = await promised;

      promised = (await config.reduceStep(previous, normalized, true)) as [ReturnType, Context];
    }

    return promised;
  }

  return internalReduceConstructAsync();
}
