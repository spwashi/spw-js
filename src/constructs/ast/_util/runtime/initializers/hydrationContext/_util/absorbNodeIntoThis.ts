import { RuntimeRegisters } from '@constructs/ast/_util/runtime/_types/registers';
import {
  AbsorbInput,
  AbsorbOutput,
} from '@constructs/ast/_abstract/_util/hydrate/_/util';
import { SpwConstruct } from '@constructs/ast/_abstract/spwConstruct';
import { Register } from '@constructs/runtime/register/register';

/**
 * For each absorbed Node,
 *    - if it is not a construct, simply return the node
 *    - add the node to the relevant registers
 * @param node
 */
export function absorbNodeIntoThis(
  this: { registers: RuntimeRegisters },
  node: AbsorbInput,
): AbsorbOutput | null {
  const registers = this.registers;

  if (!SpwConstruct.isSpwConstruct(node)) {
    return node;
  }

  registers.all.push(node);
  registers.subject.push(node);

  const key = node.key;
  if (!key) {
    return node;
  }

  const keys = registers.indexed.set(
    key,
    registers.indexed.get(key) ?? new Register(),
  );

  const keyRegister = keys.get(key) as Register<typeof node>;

  keyRegister.push(node);

  return node;
}
