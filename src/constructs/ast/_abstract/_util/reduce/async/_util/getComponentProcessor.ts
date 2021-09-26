import { ConstructReductionConfig } from '@constructs/ast/_abstract/_types';
import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';
import { ReductionLifecycleController } from '@constructs/ast/_abstract/_util/reduce/_util/lifecycle/types';
import { runEvaluationLifecycleAsync } from '@constructs/ast/_abstract/_util/reduce/async/_util/lifecycle/eval';
import { AsyncComponentProcessor } from '@constructs/ast/_abstract/_util/reduce/async/_util/types/componentProcessor';

export function getComponentProcessor<Context extends InteractionContext, Intermediate = any>(
  reductionConfig: ConstructReductionConfig<Context>,
  lifecycle: ReductionLifecycleController,
): AsyncComponentProcessor<Context, Intermediate> {
  return async (focalPoint): Promise<[Promise<Intermediate>[], Context]> => {
    const mut = {
      values: [] as Promise<Intermediate>[],
      context: focalPoint.context,
    };

    /**
     * Loop over each generated value
     */
    let promise;
    while ((promise = focalPoint.generator.next())) {
      const lastResolved = await promise;
      const generatedStep = lastResolved.value;
      const done = lastResolved.done;

      // break
      if (done || !Array.isArray(generatedStep)) {
        mut.context = generatedStep;
        break;
      }

      const { context: stepContext, values: stepValues } = await processGeneratedStep(
        generatedStep as [Intermediate, Context],
        focalPoint.component as ComponentDescription<Context>,
        focalPoint.context as Context,
      );

      mut.context = stepContext;
      mut.values.push(...(stepValues as Promise<Intermediate>[]));
    }

    /**
     * Return the next "step"
     */

    return [mut.values, mut.context ?? focalPoint.context];
  };

  /**
   *
   * @param generatedSubject
   * @param generatedContext
   * @param component
   * @param outerContext
   */
  async function processGeneratedStep(
    [generatedSubject, generatedContext]: [Intermediate, Context],
    component: ComponentDescription<Context>,
    outerContext: Context,
  ) {
    const subject = await reductionConfig.deriveSubject(
      generatedSubject,
      component.name,
      generatedContext,
      true,
    );
    return runEvaluationLifecycleAsync(lifecycle, [subject, outerContext]);
  }
}
