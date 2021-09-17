import { PlainInteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/plainInteractionContext';
import { HydrationContext } from '@constructs/ast/_abstract/_util/hydrate/_/util';
import { RuntimeRegisters } from '@constructs/runtime/_util/_types/registers';
import { absorbNodeIntoThis } from '@constructs/runtime/_util/initializers/hydrationContext/_util/absorbNodeIntoThis';
import { hydrateNode } from '@constructs/runtime/_util/initializers/hydrationContext/_util/hydrateNode';

type PartialHydrationContext = Partial<HydrationContext> & {
  registers: RuntimeRegisters;
};

/**
 * Initialize a HydrationContext {@see HydrationContext}
 *
 * @param registers
 */
export function initHydrationContext(registers: RuntimeRegisters): HydrationContext {
  const hydrationContext: HydrationContext = PlainInteractionContext().enter({
    kind: 'hydrationContext',
    registers: registers,
    hydrate: hydrateNode,
    absorb: absorbNodeIntoThis,
  } as PartialHydrationContext) as HydrationContext;
  return hydrationContext;
}
