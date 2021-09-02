import { RuntimeRegisters } from '@constructs/runtime/_util/_types/registers';
import { AbsorbInput, AbsorbOutput } from '@constructs/ast/_abstract/_util/hydrate/_/util';
import { Construct } from '../../../../../ast/_abstract/construct';
import { Register } from '@constructs/runtime/register/register';
import { ConstructComponentKey } from '@constructs/ast/_abstract/_types';
import { HydratedConstruct } from '@constructs/ast/_abstract/_types/internal';

function appendToIndexRegister(
  registers: RuntimeRegisters,
  key: ConstructComponentKey,
  node: Construct | HydratedConstruct,
) {
  if (!key) {
    return;
  }

  const keys = registers.indexed.set(key, registers.indexed.get(key) ?? new Register());
  const keyRegister = keys.get(key) as Register<typeof node>;

  keyRegister.push(node);
}

function appendToCollectiveRegister(registers: RuntimeRegisters, node: Construct) {
  const resolved = registers.all.resolve(node);
  if (!resolved) {
    registers.all.push(node);
  }
}

function appendToSubjectRegister(registers: RuntimeRegisters, node: Construct) {
  registers.subject.push(node);
}
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
  if (!Construct.isConstruct(node)) {
    console.log(node);
    return node;
  }
  const registers = this.registers;
  appendToCollectiveRegister(registers, node);
  appendToSubjectRegister(registers, node);
  appendToIndexRegister(registers, node.key, node);
  return node;
}
