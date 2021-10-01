import { HydratedConstruct, RawConstruct } from '@constructs/ast/_abstract/_types/internal';
import { hydrateRecursively } from '@constructs/ast/_abstract/_util/hydrate/recursive';
import { Construct } from '@constructs/ast/_abstract/construct';
import { initHydrationContext } from '@constructs/runtime/_util/initializers/hydrationContext';
import { initRuntimeRegisters } from '@constructs/runtime/_util/initializers/runtime/registers';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '@constructs/runtime/_util/selectors';
import { Runtime } from '@constructs/runtime/runtime';
import { spwParser } from '../../../../../parser/generated';

/**
 * Parse a string of text within the context of a runtime
 * @param runtime
 * @param src
 */
function parseIntoRuntime(
  runtime: Runtime,
  src: string,
  cache: MutableRuntimeCache = {},
): HydratedConstruct | Construct | null {
  const raw = spwParser.parse(src, {}) as RawConstruct;
  const context = initHydrationContext(runtime.registers);

  cache.added = cache.added ?? {};
  const cached = cache.added[src];

  if (cached) {
    return cached;
  }

  const hydrated = hydrateRecursively(raw, context) as Construct | null;

  return (cache.added[src] = hydrated);
}

type MutableRuntimeCache = {
  runtime?: Runtime;
  added?: { [k: string]: Construct | HydratedConstruct | null };
};

function _getRuntime(cache: MutableRuntimeCache = {}) {
  const registers = initRuntimeRegisters();
  cache.runtime = cache.runtime ?? ({ registers } as Runtime);
  return cache.runtime;
}
/**
 * Initialize a runtime, optionally providing a "seed" source
 * @param src
 */
export default function initRuntimeWithSrc(src?: string, cache: MutableRuntimeCache = {}): Runtime {
  const runtime = _getRuntime(cache);
  src && parseIntoRuntime(runtime, src);
  return runtime;
}
/**
 * Get the most salient node from a src string.
 * Returns the last acknowledged node.
 * @param src
 * @param cache
 */
export function getSalientNode(
  src: string,
  cache: MutableRuntimeCache = {},
): Construct | undefined {
  const runtime = _getRuntime(cache);
  parseIntoRuntime(runtime, src, cache);
  return selectLastAcknowledgedNodeFromRuntime(runtime);
}

/**
 * Get all nodes in a runtime
 *
 * @param src
 * @param cache
 */
export function getAllNodes(src: string, cache: MutableRuntimeCache = {}): Construct[] {
  const runtime = _getRuntime(cache);
  parseIntoRuntime(runtime, src, cache);
  return selectAllNodesFromRuntime(runtime) ?? [];
}
