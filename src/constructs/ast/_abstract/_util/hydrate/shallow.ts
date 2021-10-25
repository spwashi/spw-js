import { ConstructReductionConfig, ConstructReductionOptions } from "@constructs/ast/_abstract/_types";
import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";
import { fillReductionConfig } from "@constructs/ast/_abstract/_util/reduce/_util/config/completeConfig";
import { reduceConstructAsync } from "@constructs/ast/_abstract/_util/reduce/async/reduceConstructAsync";
import { reduceConstructSync } from "@constructs/ast/_abstract/_util/reduce/sync/reduceConstructSync";
import { getConstructConstructor } from "../../../../index";
import { IConstructComponent } from "../../_types/IConstructComponent";
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

const deriveSubjectValue: ConstructReductionConfig["deriveSubjectValue"] =
          ([value], key: any, isAsync: boolean) => {
              if (!isAsync) {
                  return [key as string, value];
              }
              const resolveStep =
                        () => (
                            async function() {
                                return [
                                    key as string,
                                    await value
                                ];
                            }
                        )();

              return Promise.resolve(resolveStep());
          };

const reduceStep: ConstructReductionConfig["reduceStep"] =
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
          };

function getHydrationStepNormalizer<Context extends InteractionContext>() {
    const stepNormalizer: ConstructReductionConfig<Context, any, any, string>["normalizeStep"] =
              function(component, step) {
                  const [entries, context] = step;

                  // hydrate each value
                  const hydratedEntries =
                            entries
                                .map(([key, value]) => {
                                    const toHydrated = component.subjectEvaluators.hydrate;
                                    const hydrated   = toHydrated ? toHydrated(value, context) : value;
                                    return [key, hydrated];
                                });

                  return [hydratedEntries, context];
              };
    return stepNormalizer;
}

type ShallowHydrationOutput<Context extends HydrationContext = HydrationContext> = { node: Construct; promise: Promise<[any, Context]> };
type ShallowHydrationInput<Unhydrated extends RawConstruct | any, Context extends HydrationContext = HydrationContext> = [node: Unhydrated, context: Context];

/**
 * Hydrates a node without probing further.
 * Only takes the node's properties and
 *
 * @param unhydrated
 * @param context
 */
export function hydrateShallowInContext<Unhydrated extends RawConstruct | any, Context extends HydrationContext = HydrationContext>(input: ShallowHydrationInput<Unhydrated, Context>): ShallowHydrationOutput<Context> {

    const reductionConfig = fillReductionConfig<Context>(
        {
            deriveSubjectValue: deriveSubjectValue,
            reduceStep:    reduceStep,
            normalizeStep: getHydrationStepNormalizer()
        } as ConstructReductionOptions<Context>
    );

    const doKey = false;

    try {
        const [unhydratedNode, context] = input;

        /**
         * The constructor of the node kind
         */
        let Ctor: typeof Construct;
        {
            Ctor = getConstructConstructor((unhydratedNode as RawConstruct)?.kind);
        }

        /**
         * A node that's been initialized with its respective constructor
         */
        let hydratedNode: Construct;
        {
            /**
             * A plain object with
             */
            let reducedNode;
            {
                const constructComponents = Ctor.components as IConstructComponent<Context>[];
                const synchronousSeed     = [[], context] as [any[], Context];
                (
                    [reducedNode] =
                        reduceConstructSync<Context>(
                            unhydratedNode,
                            reductionConfig,
                            synchronousSeed,
                            constructComponents
                        )
                );
            }
            hydratedNode = new Ctor(reducedNode);
        }

        /**
         * The result of asynchronously processing a hydrated node
         */
        let promisedNode: any = null as any;
        {
            const _passiveCatch       = (e: any) => ((console.log(e), [hydratedNode, context] as [Construct, Context]));
            const constructComponents = Ctor.components as IConstructComponent<Context>[];
            const asynchronousSeed    = [null, context] as [null, Context];
            if (context.doPromise) {
                promisedNode =
                    reduceConstructAsync<Context>(
                        hydratedNode,
                        reductionConfig,
                        asynchronousSeed,
                        constructComponents
                    ).catch(_passiveCatch);
            }
        }

        /**
         * The output from absorbing a node, if contextually applicable
         */
        let absorptionOutput: any;
        {
            doKey && key(context, hydratedNode);
            context.doPromise && promise(context, promisedNode);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            absorptionOutput = context.absorb && context.absorb(hydratedNode);
        }

        /**
         * Return the node and a promise to process the node some other way
         */
        return {
            node:    hydratedNode,
            promise: promisedNode
        };
    } catch (e) {
        console.error(e);
        throw e;
    }
}
