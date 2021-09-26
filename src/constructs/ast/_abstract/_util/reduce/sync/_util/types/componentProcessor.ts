import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';

type ComponentProcessorConfig<Context extends InteractionContext = InteractionContext> = {
  context: Context;
  generator: Generator;
  component: ComponentDescription<Context>;
};
export type SyncComponentProcessor<
  Context extends InteractionContext = InteractionContext,
  Intermediate = any,
> = (config: ComponentProcessorConfig<Context>) => [Intermediate[], Context];
