import { ConstructReductionConfig } from "@constructs/ast/_abstract/_types";
import { ComponentDescription } from "@constructs/ast/_abstract/_types/componentDescription";
import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";
import { ReductionLifecycleController } from "@constructs/ast/_abstract/_util/reduce/_util/lifecycle/types";
import { runEvaluationLifecycleAsync } from "@constructs/ast/_abstract/_util/reduce/async/_util/lifecycle/eval";
import { AsyncComponentProcessor } from "@constructs/ast/_abstract/_util/reduce/async/_util/types/componentProcessor";

/**
 * Returns a function that iterates over the values of a construct component
 *
 * @param reductionConfig
 * @param lifecycle
 */
export function getComponentProcessor<Context extends InteractionContext, Intermediate = any>(
    reductionConfig: ConstructReductionConfig<Context>,
    lifecycle: ReductionLifecycleController
): AsyncComponentProcessor<Context, Intermediate> {
    return async (scope): Promise<[Promise<Intermediate>[], Context]> => {
        const mut =
                  {
                      values:  [] as Promise<Intermediate>[],
                      context: scope.context
                  };

        /**
         * For each generated step processing a component,
         *  derive a subject and run it through the evaluation lifecycle stage
         *
         * @param componentLocationStep
         * @param component
         * @param outerContext
         */
        const componentLocationStepProcessor =
                  async (
                      componentLocationStep: [Intermediate, Context],
                      component: ComponentDescription<Context>,
                      outerContext: Context
                  ) => {
                      const [location, context] = componentLocationStep;

                      const subject =
                                await reductionConfig.deriveSubject(
                                    location,
                                    component.name,
                                    context,
                                    true
                                );

                      return runEvaluationLifecycleAsync(lifecycle, [subject, outerContext]);
                  };


        /**
         * Loop over each generated value
         */
        let promise;
        while ((promise = scope.valueGenerator.next())) {
            const { done, value: componentLocationStep } = await promise;

            // break if done or not an array
            if (done || !Array.isArray(componentLocationStep)) {
                mut.context = componentLocationStep;
                break;
            }


            const { context: stepContext, values: stepValues } =
                      await componentLocationStepProcessor(
                          componentLocationStep as [Intermediate, Context],
                          scope.component as ComponentDescription<Context>,
                          scope.context as Context
                      );

            mut.context = stepContext;
            mut.values.push(...(stepValues as Promise<Intermediate>[]));
        }

        /**
         * Return the next "step"
         */

        return [mut.values, mut.context ?? scope.context];
    };
}
