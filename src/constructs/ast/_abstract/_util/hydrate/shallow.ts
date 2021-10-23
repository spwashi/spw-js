import { ConstructReductionOptions } from "@constructs/ast/_abstract/_types";
import { ComponentDescription } from "@constructs/ast/_abstract/_types/componentDescription";
import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";
import { completeConstructReductionConfig } from "@constructs/ast/_abstract/_util/reduce/_util/config/completeConfig";
import { reduceConstructAsync } from "@constructs/ast/_abstract/_util/reduce/async/reduceConstructAsync";
import { reduceConstructSync } from "@constructs/ast/_abstract/_util/reduce/sync/reduceConstructSync";
import { getConstructClass } from "../../../../index";
import { RawConstruct } from "../../_types/internal";
import { Construct } from "../../construct";
import { HydrationContext } from "./_util/util";

const nonNull = ([, n]: [any, any]) => n != void 0;

function key(context: InteractionContext, hydratedNode: Construct) {
    (context.top.arr = context.top.arr ?? []).push(hydratedNode.key);
}
function promise<Context>(context: InteractionContext, promisedNode: Promise<[any, Context]>) {
    (context.top.promises = context.top.promises ?? []).push(promisedNode);
}


/**
 * Hydrates a node without probing further.
 * Only takes the node's properties and
 *
 * @param node
 * @param context
 */
export function hydrateShallowInContext<Unhydrated extends RawConstruct | any, Context extends HydrationContext = HydrationContext>(
    [node, context]: [node: Unhydrated, context: Context]
): {
    node: Construct;
    promise: Promise<[any, Context]>
} {
    const reductionConfig =
              completeConstructReductionConfig<Context>(
                  {
                      deriveSubject:
                          ([value], key: any, isAsync: boolean) => {
                              const resolveStep = (key: any, value: any) => (async () => [
                                  key as string, await value
                              ])();
                              return !isAsync ? [
                                  key as string, value
                              ] : Promise.resolve(resolveStep(key, value));
                          },
                      reduceStep:
                          function(prevStep, currStep, isAsync) {
                              const [prevVals]               = prevStep;
                              const [currVal, activeContext] = currStep;

                              if (isAsync === null) {
                                  return [
                                      currVal,
                                      activeContext
                                  ];
                              }

                              const absorbConstruct =
                                        ([key, n]: [string, any]) => {
                                            const value =
                                                      Construct.isConstruct(n)
                                                      ? (<HydrationContext>activeContext).absorb?.(n)
                                                      : n;

                                            return [key, value];
                                        };

                              const absorbedNodes =
                                        currVal
                                            .map(absorbConstruct)
                                            .filter(nonNull);

                              const reducedElements =
                                        [
                                            ...prevVals ?? [],
                                            ...absorbedNodes
                                        ];

                              return [
                                  reducedElements,
                                  activeContext as HydrationContext
                              ];
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
                                          return [
                                              key, hydrated
                                          ];
                                      }),
                                  context
                              ];
                          }
                  } as ConstructReductionOptions<Context>
              );

    const doKey     = false;
    const doPromise = false;

    try {
        const Construct  = getConstructClass((node as RawConstruct)?.kind);
        const components = Construct.components as ComponentDescription<Context>[];

        const step =
                  reduceConstructSync<Context>(
                      node,
                      reductionConfig,
                      [[], context],
                      components
                  );

        const hydratedNode =
                  new Construct(step[0]);

        const promisedNode =
                  reduceConstructAsync<Context>(
                      hydratedNode,
                      reductionConfig,
                      [null, context],
                      components
                  )
                      .catch(
                          e => {
                              console.log(e);
                              return [hydratedNode, context] as [Construct, Context];
                          }
                      );

        doKey && key(context, hydratedNode);
        doPromise && promise(context, promisedNode);

        context.absorb && context.absorb(hydratedNode);

        return {
            node:    hydratedNode,
            promise: promisedNode
        };
    } catch (e) {
        console.error(e);
        throw e;
    }
}
