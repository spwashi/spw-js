import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';

export type AsyncLocationGenerator<
  //
  //
  YieldOutput = any,
  Context extends InteractionContext = InteractionContext,
> = (
  item: any,
  context: Context | null,
) => AsyncGenerator<
  [YieldOutput | undefined, Context | null],
  Context | null,
  YieldOutput | undefined
>;
