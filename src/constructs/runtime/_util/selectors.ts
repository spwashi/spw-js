import { Construct } from '../../ast/_abstract/construct';
import { Runtime } from '@constructs/runtime/runtime';

/**
 * All registered nodes
 *
 * @param runtime
 */
export function selectAllNodesFromRuntime(runtime: Runtime): Construct[] {
  const registerValues = runtime.registers.all.entries ?? [];
  return registerValues.map((entry) => entry.item);
}

/**
 * The node that the top level perspective has last considered
 *
 * @param runtime
 */
export function selectLastAcknowledgedNodeFromRuntime(runtime: Runtime): Construct | undefined {
  return runtime.registers.subject.entries?.[0]?.item;
}
