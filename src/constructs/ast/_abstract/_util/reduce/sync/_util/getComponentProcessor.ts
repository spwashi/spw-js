import { ConstructReductionConfig } from "@constructs/ast/_abstract/_types";
import { ComponentDescription } from "@constructs/ast/_abstract/_types/componentDescription";
import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";
import { ReductionLifecycleController } from "@constructs/ast/_abstract/_util/reduce/_util/lifecycle/types";
import { runEvaluationLifecycleSync } from "@constructs/ast/_abstract/_util/reduce/sync/_util/lifecycle/eval";

type ComponentProcessorConfig<Context extends InteractionContext = InteractionContext> = {
    generator: Generator<[any, [any, Context][1] | null], [any, Context][1] | null>;
    context: Context | null;
    component: ComponentDescription<Context>;
};
export default function getComponentProcessor<Context extends InteractionContext = InteractionContext,
    Intermediate = any,
    >(
    reductionConfig: ConstructReductionConfig<Context>,
    lifecycle: ReductionLifecycleController
): (c: ComponentProcessorConfig<Context>) => [Intermediate[], Context] {
    return (scope: ComponentProcessorConfig<Context>) => {
        const mut =
                  {
                      values:  [] as Intermediate[],
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
                  (
                      componentLocationStep: [Intermediate, Context],
                      component: ComponentDescription<Context>,
                      outerContext: Context
                  ) => {
                      const [location, context] = componentLocationStep;

                      const subject =
                                reductionConfig.deriveSubject(
                                    location,
                                    component.name,
                                    context,
                                    false
                                );

                      return runEvaluationLifecycleSync(lifecycle, [subject, outerContext]);
                  };


        /**
         * Loop over each generated value
         */

        let next;
        while (
            ((next = scope.generator.next()),
                (mut.context = next.done ? next.value : mut.context),
                !next.done)
            ) {
            const componentLocationStep = next.value;

            if (!scope.context) break;

            const { context: stepContext, values: stepValues } =
                      componentLocationStepProcessor(
                          componentLocationStep as [Intermediate, Context],
                          scope.component as ComponentDescription<Context>,
                          scope.context
                      );

            mut.context = stepContext;
            mut.values.push(...(stepValues as Intermediate[]));
        }

        /**
         * Return the next "step"
         */

        return [mut.values, mut.context ?? scope.context] as [Intermediate[], Context];
    };
}
