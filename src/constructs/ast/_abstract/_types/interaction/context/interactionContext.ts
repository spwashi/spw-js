type O = { [k: string]: any };

export interface InteractionContext extends O {
  enter<T extends Partial<InteractionContext> | any = Partial<InteractionContext>>(
    arg?: T,
  ): InteractionContext & T & this;

  exit(): InteractionContext | void;
}
