import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';

type T = InteractionContext & { parent: InteractionContext | null };
export function initInteractionContext<
  Type extends Partial<InteractionContext> & { [k: string]: any },
>(item?: Type): T & Type {
  return {
    ...(item || {}),
    parent: null,
    enter<Type2 extends Partial<InteractionContext>>(item?: Type2) {
      return {
        ...this,
        ...(item || {}),
        parent: this,
      };
    },
    exit() {
      return this.parent;
    },
  } as T & Type;
}
