import { SpwConstruct } from '@constructs/ast/_abstract/spwConstruct';
import { Runtime } from '@constructs/runtime/runtime';

/**
 * All registered nodes
 *
 * @param runtime
 */
export function selectAllNodes(runtime: Runtime): SpwConstruct[] {
  const registerValues = runtime.registers.all.entries ?? [];
  return registerValues.map((entry) => entry.item);
}

/**
 * The node that the top level perspective has last considered
 *
 * @param runtime
 */
export function selectLastAcknowledgedNode(
  runtime: Runtime,
): SpwConstruct | undefined {
  return runtime.registers.subject.entries?.[0]?.item;
}
