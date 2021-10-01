import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';
import { Construct } from '@constructs/ast/_abstract/construct';

export function getInternalComponentDescriptions(): ComponentDescription<InteractionContext>[] {
  return [
    Construct.makeComponent({
      name: 'outerNodeContext',
      generator: function* (i, c) {
        const outer = c?.parent?.outerNodeContext ?? null;
        if (!outer) return null;

        if (outer.parent.raw) {
          delete outer.parent.raw;
        }

        yield [outer, null];
        return null;
      },
      evaluators: { stringify: () => '' },
    }),
    Construct.makeComponent({ name: 'src', evaluators: { stringify: () => '' } }),
    Construct.makeComponent({ name: 'srcloc', evaluators: { stringify: () => '' } }),
  ] as ComponentDescription<InteractionContext>[];
}
