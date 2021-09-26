import { ConstructReductionConfig } from '@constructs/ast/_abstract/_types';
import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';
import { getInternalComponentDescriptions } from '@constructs/ast/_abstract/_util/reduce/_util/getInternalComponentDescriptions';
import { ReductionLifecycleController } from '@constructs/ast/_abstract/_util/reduce/_util/lifecycle/types';
import getComponentProcessor from '@constructs/ast/_abstract/_util/reduce/sync/_util/getComponentProcessor';
import getValueGenerator from '@constructs/ast/_abstract/_util/reduce/sync/_util/getValueGenerator';

interface ConstructReducerSync<
  Context extends InteractionContext = InteractionContext,
  Subject = any,
  StartType = any | null,
  ReturnType = any,
> {
  (seed: [StartType | null, Context | null], subject: Subject | null): [ReturnType, Context];
}

export function getConstructReducerSync<
  Context extends InteractionContext = InteractionContext,
  Subject = any,
  StartType = any | null,
  Intermediate = any,
  ReturnType = any,
>(
  reductionConfig: ConstructReductionConfig<Context>,
  lifecycle: ReductionLifecycleController,
  prototypes: Iterable<ComponentDescription<Context>>,
): ConstructReducerSync<Context, Subject, StartType, ReturnType> {
  type I_CD = Iterable<ComponentDescription<Context>>;

  const allPrototypes = [...getInternalComponentDescriptions(), ...prototypes] as I_CD;
  const componentProcessor = getComponentProcessor(reductionConfig, lifecycle);
  function reduceConstruct(
    seed: [StartType | null, Context | null],
    subject: Subject | null,
  ): [ReturnType, Context] {
    const mut = { step: seed } as { step: [StartType | Intermediate | ReturnType, Context] };

    for (const component of allPrototypes) {
      const [, context] = mut.step;

      const generator = getValueGenerator(component, subject, context);
      const processComponent = componentProcessor;
      const [values, nextContext] = processComponent({
        component,
        context,
        generator,
      });
      const resolved = [values, nextContext] as [Intermediate[], Context];
      const normalized = reductionConfig.normalizeStep(component, resolved);
      const reduced = reductionConfig.reduceStep(mut.step, normalized, false);

      mut.step = reduced as [Intermediate, Context] | [ReturnType, Context];
    }
    return mut.step as [ReturnType, Context];
  }
  return reduceConstruct;
}
