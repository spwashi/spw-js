import {
  ConstructReductionConfig,
  ConstructReductionOptions,
} from '@constructs/ast/_abstract/_types';
import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';
import { completeConfig } from '@constructs/ast/_abstract/_util/reduce/_/util';
import { getConstructClass } from '../../../../index';
import { RawConstruct } from '../../_types/internal';
import { Construct } from '../../construct';
import { HydrationContext, joinHydratedProperties } from './_/util';

/**
 * For each value, resolve the promise if we're in "async" mode
 * @param value
 * @param key
 * @param context
 * @param isAsync
 */
const _hydrationValueMapper: ConstructReductionConfig['valueMapper'] = (
  value: any,
  key: any,
  context: InteractionContext | undefined | null,
  isAsync: boolean,
) => {
  return !isAsync
    ? [key as string, value]
    : Promise.resolve((async () => [key as string, await value])());
};

function _getHydrationStepNormalizer<Context extends InteractionContext>() {
  return ((prototype: ComponentDescription<Context>, [entries, context]) => {
    return [
      entries.map(([key, value]) => {
        const hydrated = prototype.evaluators.hydrate
          ? prototype.evaluators.hydrate(value, context)
          : value;
        return [key, hydrated];
      }),
      context,
    ];
  }) as ConstructReductionConfig<Context>['stepNormalizer'];
}

/**
 * Absorbs all generated constructs into the runtime
 *
 * @param prev
 * @param step
 * @param isAsync
 */
const _hydrationStepReducer: ConstructReductionConfig<HydrationContext>['stepReducer'] = function (
  [prev],
  step,
  isAsync,
) {
  const [curr, context] = step as [[string, string | Construct][], HydrationContext];
  if (isAsync === null) {
    return [curr ?? [], context];
  }
  if (typeof context?.enter !== 'function') {
    console.error(context);
    throw new Error('Wrong context');
  }
  return [
    [
      ...prev,
      ...(curr ?? [])
        .map(([k, n]: [string, string | Construct]) => {
          // absorb constructs, ignore others
          const absorbed = Construct.isConstruct(n) ? context.absorb?.(n) : n;
          return [k, absorbed] as [string, Construct | any];
        })
        .filter(([, n]: [string, any]) => n != void 0),
    ],
    context.enter() as HydrationContext,
  ];
};

/**
 * Hydrates a node without probing
 *
 * @param node
 * @param context
 */
export function hydrateShallow<
  Unhydrated extends RawConstruct | any,
  Context extends HydrationContext = HydrationContext,
  Out extends [string, any] = [string, any],
>(node: Unhydrated, context: Context): { node: Construct; promise: Promise<[Out[], Context]> } {
  type Output = Out[];
  type SeedValue = [];

  const seed: [SeedValue, Context] = [[], context];

  const options = {
    valueMapper: _hydrationValueMapper,
    stepReducer: _hydrationStepReducer,
    stepNormalizer: _getHydrationStepNormalizer<Context>(),
  } as ConstructReductionOptions<Context>;

  const config = completeConfig<Context>(options);
  const Ctor = getConstructClass((node as RawConstruct)?.kind);
  const stepSync = Ctor.reduce<Out[], Out, SeedValue, Unhydrated, Context>(node, options, seed);

  const intermediate = stepSync[0];
  const hydratedNode = new Ctor(joinHydratedProperties(intermediate));
  const stepInter = config.stepReducer(stepSync, stepSync, null);
  const promise = Ctor.reduceAsync<Context>(node, config, stepInter) as Promise<[Output, Context]>;
  context.absorb && context.absorb(hydratedNode);
  return {
    node: hydratedNode,
    promise,
  };
}
