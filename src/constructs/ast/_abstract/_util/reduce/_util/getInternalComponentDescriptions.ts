import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';
import { Construct } from '@constructs/ast/_abstract/construct';

export function getInternalComponentDescriptions(): ComponentDescription<InteractionContext>[] {
  return [
    Construct.makeComponent({
      name: 'nodeScope',
      generator: function* (i, c) {
        const outer = c?.parent?.nodeScope ?? null;
        if (!outer) return null;

        yield [outer, null];
        return null;
      },
      evaluators: { stringify: () => '' },
    }),
    Construct.makeComponent({ name: 'src', evaluators: { stringify: () => '' } }),
    Construct.makeComponent({ name: 'srcloc', evaluators: { stringify: () => '' } }),
  ] as ComponentDescription<InteractionContext>[];
}
