import {ConstructReductionConfig, InteractionContext} from '@constructs/ast/_abstract/_types';
import {RawSpwConstruct} from '../../_types/internal';
import {SpwConstruct} from '../../spwConstruct';
import {_entryReducer, HydrationContext, joinHydratedProperties} from './_/util';
import {getConstructClass} from '../../../../index';
import {completeConfig} from '@constructs/ast/_abstract/_util/reduce/_/util';

const _intermediateHydrationEvaluator: ConstructReductionConfig['evaluator'] =
          (value: any, key: any, context: InteractionContext | undefined | null, isAsync: boolean) =>
              !isAsync ? [key as string, value]
                       : Promise.resolve((
                                             async () =>
                                                 [
                                                     key as string,
                                                     await value,
                                                 ]
                                         )());

const _intermediateStepNormalizer: ConstructReductionConfig['stepNormalizer'] =
          (prototype, [entries, context]) => {
              return [
                  entries.map(
                      ([key, value]) => {
                          const hydrated = prototype.evaluators.hydrate
                                           ? prototype.evaluators.hydrate(value, context)
                                           : value;
                          return [
                              key,
                              hydrated,
                          ];
                      },
                  ),
                  context ?? {},
              ];
          };

const _shallowHydrationReducer: ConstructReductionConfig['reducer'] = function ([prev], [curr, context], isAsync) {
    if (isAsync === null) { return [curr ?? [], context]; }

    return [
        [...prev, ...curr ?? []],
        {
            ...context ?? {},
            internal:
                Array.isArray(prev)
                ? prev.reduce(_entryReducer, {} as RawSpwConstruct)
                : context?.internal,
        },
    ];
};

/**
 * Hydrates a node without probing
 *
 * @param node
 * @param context
 */
export function hydrateShallow<Unhydrated extends RawSpwConstruct | any, Context extends HydrationContext = HydrationContext, Out extends [string, any] = [string, any]>(
    node: Unhydrated,
    context: Context,
): { node: SpwConstruct, promise: Promise<[Out[], Context]> } {
    type Output = Out[];
    type SeedValue = Partial<RawSpwConstruct>;

    const seed: [SeedValue, Context] =
              [{}, context];

    const options =
              {
                  stepNormalizer: _intermediateStepNormalizer,
                  evaluator:      _intermediateHydrationEvaluator,
                  reducer:        _shallowHydrationReducer,
              };

    const config   = completeConfig(options);
    const Ctor     = getConstructClass((node as RawSpwConstruct)?.kind);
    const stepSync = Ctor.reduce<Out[], Out, SeedValue, Unhydrated, Context>(node, options, seed);

    const intermediate = stepSync[0];
    const hydratedNode = new Ctor(joinHydratedProperties(intermediate));
    const stepInter    = config.reducer(stepSync, stepSync, null);
    const promise      = Ctor.reduceAsync(node, config, stepInter) as Promise<[Output, Context]>;
    return {
        node: hydratedNode,
        promise,
    }
}


