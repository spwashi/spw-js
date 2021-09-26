import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';

type AsyncComponentProcessorConfig<Context extends InteractionContext = InteractionContext> = {
  context: Context;
  generator: AsyncGenerator;
  component: ComponentDescription<Context>;
};
export type AsyncComponentProcessor<
  Context extends InteractionContext = InteractionContext,
  Intermediate = any,
> = (config: AsyncComponentProcessorConfig<Context>) => Promise<[Promise<Intermediate>[], Context]>;
