import { ConstructKind } from '@constructs/ast/_types/kinds';
import { spwItemConstructors } from '@constructs/constructors';
import { Construct } from './ast/_abstract/construct';

export function getConstructClass(kind: ConstructKind | any): typeof Construct {
  return spwItemConstructors[kind as ConstructKind] || Construct;
}
