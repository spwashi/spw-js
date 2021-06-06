import { Register } from '@constructs/runtime/register/register';
import { RuntimeRegisters } from '@constructs/runtime/_util/_types/registers';

export function initRuntimeRegisters(): RuntimeRegisters {
  return {
    all: new Register(),
    indexed: new Map(),
    subject: new Register(null, { memory: 1 }),
  };
}
