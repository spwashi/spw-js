import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';

export const PlainInteractionContext = (): InteractionContext => ({
  enter<T extends Partial<InteractionContext>>(item?: T): InteractionContext & T {
    const parent = (this || PlainInteractionContext()) as InteractionContext;
    return {
      ...parent,
      ...(item || {}),
      parent,
    } as InteractionContext & T & { parent: InteractionContext };
  },
  exit(): InteractionContext | void {
    return this;
  },
});
