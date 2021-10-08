import { ComponentDescription } from "@constructs/ast/_abstract/_types/componentDescription";
import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";

export type AsyncComponentProcessingScope<Context extends InteractionContext = InteractionContext> = {
    context: Context;
    valueGenerator: AsyncGenerator;
    component: ComponentDescription<Context>;
};
export type AsyncComponentProcessor<Context extends InteractionContext = InteractionContext,
    Intermediate = any,
    > = (config: AsyncComponentProcessingScope<Context>) => Promise<[Promise<Intermediate>[], Context]>;
