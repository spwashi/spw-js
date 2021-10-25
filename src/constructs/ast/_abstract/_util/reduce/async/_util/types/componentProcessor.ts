import { IConstructComponent } from "../../../../../_types/IConstructComponent";
import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";

export type AsyncComponentProcessingScope<Context extends InteractionContext = InteractionContext> = {
    context: Context;
    subject: any;
    component: IConstructComponent<Context>;
};
export type ComponentValueGenerationProcessorAsync<Context extends InteractionContext = InteractionContext,
    Intermediate = any,
    > = (config: AsyncComponentProcessingScope<Context>) => Promise<[Promise<Intermediate>[], Context]>;
