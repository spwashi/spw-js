import { Runtime } from '@constructs/runtime/runtime';
import { initRuntimeRegisters } from '@constructs/runtime/_util/initializers/runtime/registers';
import { initHydrationContext } from '@constructs/runtime/_util/initializers/hydrationContext';
import { spwParser } from '../../../../../parser/generated';
import { RawSpwConstruct } from '@constructs/ast/_abstract/_types/internal';
import { hydrateRecursively } from '@constructs/ast/_abstract/_util/hydrate/recursive';

export default function initRuntime(src: string): Runtime {
  const registers = initRuntimeRegisters();
  const context = initHydrationContext(registers);
  const raw = spwParser.parse(src, {}) as RawSpwConstruct;

  hydrateRecursively(raw, context);

  const runtime = { registers } as Runtime;

  return runtime;
}
