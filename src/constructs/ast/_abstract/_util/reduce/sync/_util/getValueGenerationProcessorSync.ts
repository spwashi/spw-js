import { ConstructReductionConfig } from "@constructs/ast/_abstract/_types";
import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";
import { ReductionLifecycleController } from "@constructs/ast/_abstract/_util/reduce/_util/lifecycle/types";
import getValueGeneratorSync from "@constructs/ast/_abstract/_util/reduce/sync/_util/getValueGenerator";
import { runEvaluationLifecycleSync } from "@constructs/ast/_abstract/_util/reduce/sync/_util/lifecycle/eval";
import { IConstructComponent } from "../../../../_types/IConstructComponent";

type ComponentProcessorConfig<Context extends InteractionContext = InteractionContext> = {
    subject: any;
    context: Context | null;
    component: IConstructComponent<Context>;
};
type ComponentValueGenerationProcessorSync<Context extends InteractionContext = InteractionContext, Intermediate = any> = (c: ComponentProcessorConfig<Context>) => [Intermediate[], Context];

export default function getValueGenerationProcessorSync<Context extends InteractionContext = InteractionContext, Intermediate = any, >(
    reductionConfig: ConstructReductionConfig<Context>,
    lifecycle: ReductionLifecycleController
): ComponentValueGenerationProcessorSync<Context, Intermediate> {
    return ({ component, context, subject }: ComponentProcessorConfig<Context>) => {
        const mut = { values: [], context: context } as { values: Intermediate[], context: Context };

        /**
         * For each location generated by the component,
         *  derive a subject and run the evaluation lifecycle method on it
         * @param subjectStep
         */
        function processSubjectStep(subjectStep: [any, Context]) {
            if (!context) return false;

            const value     = reductionConfig.deriveSubjectValue(subjectStep, component.name, false);
            const evaluated = runEvaluationLifecycleSync(lifecycle, [value, context]);

            mut.context = evaluated.context;
            mut.values.push(...(evaluated.values as Intermediate[]));
            return true;
        }

        // loop over each generated value
        {
            let next;
            const valueGenerator = getValueGeneratorSync(component, subject, context as Context);
            while (
                ((next = valueGenerator.next()),
                    (mut.context = next.done ? next.value : mut.context),
                    !next.done)
                ) {
                const subjectStep = next.value;

                const okay = processSubjectStep(subjectStep);
                if (!okay) break;
            }
        }

        // next step
        return [mut.values, mut.context ?? context];
    };
}
