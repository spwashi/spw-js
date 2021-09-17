import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';

export type InteractionGenerator<
  YieldOutput = any,
  Context extends InteractionContext = InteractionContext,
> = (
  item: any,
  context: Context | null,
) => Generator<[YieldOutput, Context | null], Context | null>;
