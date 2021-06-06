import { RuntimeRegisters } from '@constructs/runtime/_util/_types/registers';
import { HydrationContext } from '@constructs/ast/_abstract/_util/hydrate/_/util';
import { hydrateNode } from '@constructs/runtime/_util/initializers/hydrationContext/_util/hydrateNode';
import { PlainInteractionContext } from '@constructs/ast/_abstract/_types';
import { absorbNodeIntoThis } from '@constructs/runtime/_util/initializers/hydrationContext/_util/absorbNodeIntoThis';

type PartialHydrationContext = Partial<HydrationContext> & {
  registers: RuntimeRegisters;
};

/**
 * Initialize a HydrationContext {@see HydrationContext}
 *
 * @param registers
 */
export function initHydrationContext(
  registers: RuntimeRegisters,
): HydrationContext {
  const hydrationContext: HydrationContext = PlainInteractionContext().enter({
    kind: 'hydrationContext',
    registers: registers,
    hydrate: hydrateNode,
    absorb: absorbNodeIntoThis,
  } as PartialHydrationContext);
  return hydrationContext;
}
