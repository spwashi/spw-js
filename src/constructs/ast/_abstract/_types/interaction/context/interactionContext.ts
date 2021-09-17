export type InteractionContext = {
  enter<T extends Partial<InteractionContext> = Partial<InteractionContext>>(
    arg?: T,
  ): InteractionContext & T;
  exit(): InteractionContext | void;
};
