import { ConstructKind } from '@constructs/ast/_types/kind';
import { Construct } from './ast/_abstract/construct';
import { spwItemConstructors } from '@constructs/constructors';

export function getConstructClass(kind: ConstructKind | any): typeof Construct {
  return spwItemConstructors[kind as ConstructKind] || Construct;
}
