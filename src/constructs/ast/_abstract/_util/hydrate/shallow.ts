import {
  ConstructReductionConfig,
  ConstructReductionOptions,
  InteractionContext,
  PlainInteractionContext,
} from '@constructs/ast/_abstract/_types';
import { RawSpwConstruct } from '../../_types/internal';
import { SpwConstruct } from '../../spwConstruct';
import { HydrationContext, joinHydratedProperties } from './_/util';
import { getConstructClass } from '../../../../index';
import { completeConfig } from '@constructs/ast/_abstract/_util/reduce/_/util';

const _intermediateHydrationEvaluator: ConstructReductionConfig['evaluator'] = (
  value: any,
  key: any,
  context: InteractionContext | undefined | null,
  isAsync: boolean,
) =>
  !isAsync
    ? [key as string, value]
    : Promise.resolve((async () => [key as string, await value])());

function getStepNormalizer<Context extends InteractionContext>() {
  const _intermediateStepNormalizer: ConstructReductionConfig<Context>['stepNormalizer'] =
    (prototype, [entries, context]) => {
      return [
        entries.map(([key, value]) => {
          const hydrated = prototype.evaluators.hydrate
            ? prototype.evaluators.hydrate(value, context)
            : value;
          return [key, hydrated];
        }),
        context ?? PlainInteractionContext().enter(),
      ];
    };
  return _intermediateStepNormalizer;
}

const _shallowHydrationReducer: ConstructReductionConfig<HydrationContext>['reducer'] =
  function ([prev], step, isAsync) {
    const [curr, context] = step as [any, HydrationContext];
    if (isAsync === null) {
      return [curr ?? [], context];
    }
    if (typeof context?.enter !== 'function') {
      console.error(context);
      throw new Error('Wrong context');
    }
    return [
      [...prev, ...(curr ?? [])],
      context?.enter() ?? PlainInteractionContext(),
    ];
  };

/**
 * Hydrates a node without probing
 *
 * @param node
 * @param context
 */
export function hydrateShallow<
  Unhydrated extends RawSpwConstruct | any,
  Context extends HydrationContext = HydrationContext,
  Out extends [string, any] = [string, any],
>(
  node: Unhydrated,
  context: Context,
): { node: SpwConstruct; promise: Promise<[Out[], Context]> } {
  type Output = Out[];
  type SeedValue = Partial<RawSpwConstruct>;

  const seed: [SeedValue, Context] = [{}, context];

  const options = {
    stepNormalizer: getStepNormalizer<Context>(),
    evaluator: _intermediateHydrationEvaluator,
    reducer: _shallowHydrationReducer,
  } as ConstructReductionOptions<Context>;

  const config = completeConfig<Context>(options);
  const Ctor = getConstructClass((node as RawSpwConstruct)?.kind);
  const stepSync = Ctor.reduce<Out[], Out, SeedValue, Unhydrated, Context>(
    node,
    options,
    seed,
  );

  const intermediate = stepSync[0];
  const hydratedNode = new Ctor(joinHydratedProperties(intermediate));
  const stepInter = config.reducer(stepSync, stepSync, null);
  const promise = Ctor.reduceAsync<Context>(node, config, stepInter) as Promise<
    [Output, Context]
  >;
  return {
    node: hydratedNode,
    promise,
  };
}
