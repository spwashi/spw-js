type O = { [k: string]: any };

export interface InteractionContext extends O {
    kind?: "hydrationContext" | "keyingContext";

    top: {
        promise: Promise<any>;
        [k: string]: any
    },

    enter<T extends Partial<InteractionContext> | any = Partial<InteractionContext>>(
        arg?: T
    ): InteractionContext & T & this;

    exit(): InteractionContext | void;
}
