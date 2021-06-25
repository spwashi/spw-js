import { Runtime } from '@constructs/runtime/runtime';
import { initRuntimeRegisters } from '@constructs/runtime/_util/initializers/runtime/registers';
import { initHydrationContext } from '@constructs/runtime/_util/initializers/hydrationContext';
import { spwParser } from '../../../../../parser/generated';
import { HydratedConstruct, RawConstruct } from '@constructs/ast/_abstract/_types/internal';
import { hydrateRecursively } from '@constructs/ast/_abstract/_util/hydrate/recursive';
import { Construct } from '@constructs/ast/_abstract/construct';

/**
 * Parse a string of text within the context of a runtime
 * @param runtime
 * @param src
 */
export function parseIntoRuntime(
  runtime: Runtime,
  src: string,
): HydratedConstruct | Construct | null {
  const raw = spwParser.parse(src, {}) as RawConstruct;
  const context = initHydrationContext(runtime.registers);
  return hydrateRecursively(raw, context) as HydratedConstruct | Construct | null;
}

/**
 * Initialize a runtime, optionally providing a "seed" source
 * @param src
 */
export default function initRuntime(src?: string): Runtime {
  const registers = initRuntimeRegisters();
  const runtime = { registers } as Runtime;
  src && parseIntoRuntime(runtime, src);
  return runtime;
}
