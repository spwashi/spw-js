import { ConstructReductionOptions } from "@constructs/ast/_abstract/_types";
import { ComponentDescription } from "@constructs/ast/_abstract/_types/componentDescription";
import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";
import { completeConstructReductionConfig } from "@constructs/ast/_abstract/_util/reduce/_util/config/completeConfig";
import { getConstructClass } from "../../../../index";
import { RawConstruct } from "../../_types/internal";
import { Construct } from "../../construct";
import { HydrationContext, joinHydratedProperties } from "./_util/util";

const nonNull = ([, n]: [any, any]) => n != void 0;

/**
 * Hydrates a node without probing further.
 * Only takes the node's properties and
 *
 * @param node
 * @param context
 */
export function hydrateShallowInContext<Unhydrated extends RawConstruct | any,
    Context extends HydrationContext = HydrationContext,
    Out extends [string, any] = [string, any],
    >([node, context]: [node: Unhydrated, context: Context]): { node: Construct; promise: Promise<[Out[], Context]> } {
    type Output = Out[];
    type SeedValue = [];

    const seed: [SeedValue, Context] = [[], context];

    const config              =
              completeConstructReductionConfig<Context>(
                  {
                      deriveSubject:
                          (value: any, key: any, context: InteractionContext | null, isAsync: boolean) => {
                              const resolveStep = (key: any, value: any) => (async () => [
                                  key as string, await value
                              ])();
                              return !isAsync ? [
                                  key as string, value
                              ] : Promise.resolve(resolveStep(key, value));
                          },
                      reduceStep:
                          function([prevVals], step, isAsync) {
                              const [currVal, currCtxt] = step;

                              if (isAsync === null) {
                                  return [currVal ?? [], currCtxt];
                              }

                              const absorbConstruct =
                                        ([key, n]: [string, any]) => [
                                            key,
                                            Construct.isConstruct(n)
                                            ? (<HydrationContext>currCtxt).absorb?.(n)
                                            : n
                                        ];
                              const reducedElements =
                                        [
                                            ...prevVals,
                                            ...(currVal ?? []).map(absorbConstruct).filter(nonNull)
                                        ];
                              return [reducedElements, currCtxt as HydrationContext];
                          },
                      normalizeStep:
                          (
                              prototype: ComponentDescription<Context>,
                              [entries, context]
                          ) => {
                              return [
                                  entries
                                      .map(([key, value]) => {
                                          const toHydrated = prototype.subjectEvaluators.hydrate;
                                          const hydrated   = toHydrated ? toHydrated(value, context) : value;
                                          return [key, hydrated];
                                      }),
                                  context
                              ];
                          }
                  } as ConstructReductionOptions<Context>
              );
    const Construct           = getConstructClass((node as RawConstruct)?.kind);
    const stepSync            = Construct.reduce<Out[], Out, SeedValue, Unhydrated, Context>(node, config, seed);
    const [deconstructedNode] = stepSync;
    const joinedProperties    = joinHydratedProperties(deconstructedNode);
    const hydratedNode        = new Construct(joinedProperties);

    const logger = (() => !true);

    const key = hydratedNode.key;

    (context.top.arr = context.top.arr ?? []).push(key);

    logger()
    && console.log("hydrated node -- '", key, "'");

    const promise = Construct.reduceAsync<Context>(hydratedNode, config, stepSync) as Promise<[Output, Context]>;
    (context.top.promises = context.top.promises ?? []).push(promise);

    logger()
    && console.log("start promise -- '", key, "'");

    context.absorb && context.absorb(hydratedNode);

    logger() && console.log("absorbed node -- '", key, "'");

    return {
        node: hydratedNode,
        promise
    };
}
