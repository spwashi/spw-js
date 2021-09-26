import { ConstructReductionConfig } from '@constructs/ast/_abstract/_types';
import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';
import { ReductionLifecycleController } from '@constructs/ast/_abstract/_util/reduce/_util/lifecycle/types';
import { runEvaluationLifecycleSync } from '@constructs/ast/_abstract/_util/reduce/sync/_util/lifecycle/eval';

type ComponentProcessorConfig<Context extends InteractionContext = InteractionContext> = {
  generator: Generator<[any, [any, Context][1] | null], [any, Context][1] | null>;
  context: Context | null;
  component: ComponentDescription<Context>;
};
export default function getComponentProcessor<
  Context extends InteractionContext = InteractionContext,
  Intermediate = any,
>(
  reductionConfig: ConstructReductionConfig<Context>,
  lifecycle: ReductionLifecycleController,
): (c: ComponentProcessorConfig<Context>) => [Intermediate[], Context] {
  return (focalPoint: ComponentProcessorConfig<Context>) => {
    const mut = {
      values: [] as Intermediate[],
      context: focalPoint.context,
    };

    /**
     * Loop over each generated value
     */

    let next;
    while (
      ((next = focalPoint.generator.next()),
      (mut.context = next.done ? next.value : mut.context),
      !next.done)
    ) {
      if (!focalPoint.context) break;
      const generatorStep = next.value;
      const { context: stepContext, values: stepValues } = processGeneratedStep(
        generatorStep as [Intermediate, Context],
        focalPoint.component as ComponentDescription<Context>,
        focalPoint.context,
      );

      mut.context = stepContext;
      mut.values.push(...(stepValues as Intermediate[]));
    }

    /**
     * Return the next "step"
     */

    return [mut.values, mut.context ?? focalPoint.context] as [Intermediate[], Context];
  };

  /**
   *
   * @param generatedSubject
   * @param generatedContext
   * @param component
   * @param outerContext
   */
  function processGeneratedStep(
    [generatedSubject, generatedContext]: [Intermediate, Context],
    component: ComponentDescription<Context>,
    outerContext: Context,
  ) {
    const subject = reductionConfig.deriveSubject(
      generatedSubject,
      component.name,
      generatedContext,
      false,
    );

    return runEvaluationLifecycleSync(lifecycle, [subject, outerContext]);
  }
}
