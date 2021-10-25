type O = { [k: string]: any };

export interface InteractionContext extends O {
    kind?: "hydrationContext" | "keyingContext";

    // whether to return a promise alongside a node when interacting with this node.
    doPromise?: boolean;

    top: {
        promise: Promise<any>;
        [k: string]: any
    },

    enter<T extends Partial<InteractionContext> | any = Partial<InteractionContext>>(
        arg?: T
    ): InteractionContext & T & this;

    exit(): InteractionContext | void;
}
