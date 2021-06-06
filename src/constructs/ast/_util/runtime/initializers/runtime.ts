import { Register } from '@constructs/runtime/register/register';
import { Runtime } from '@constructs/runtime/runtime';
import { spwParser } from '../../../../../parser/generated';
import { RawSpwConstruct } from '@constructs/ast/_abstract/_types/internal';
import { hydrateRecursively } from '@constructs/ast/_abstract/_util/hydrate/recursive';
import { initHydrationContext } from '@constructs/ast/_util/runtime/initializers/hydrationContext';
import { RuntimeRegisters } from '@constructs/ast/_util/runtime/_types/registers';

/**
 * Initialize a Runtime
 *
 * @param src
 */
export async function initRuntime(src: string): Promise<Runtime> {
  const registers = {
    all: new Register(),
    subject: new Register(null, { memory: 1 }),
    indexed: new Map(),
  } as RuntimeRegisters;

  const context = initHydrationContext(registers);
  const raw = spwParser.parse(src, {}) as RawSpwConstruct;

  hydrateRecursively(raw, context);

  const runtime = { registers } as Runtime;

  return runtime;
}
