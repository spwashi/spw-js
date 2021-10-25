import { IConstructComponent } from '../../../../../_types/IConstructComponent';
import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';

type ComponentProcessorConfig<Context extends InteractionContext = InteractionContext> = {
  context: Context;
  generator: Generator;
  component: IConstructComponent<Context>;
};
export type SyncComponentProcessor<
  Context extends InteractionContext = InteractionContext,
  Intermediate = any,
> = (config: ComponentProcessorConfig<Context>) => [Intermediate[], Context];
