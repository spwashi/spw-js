import { ConstructKind } from '@constructs/top/kinds';
import { spwItemConstructors } from '@constructs/top/constructors';
import { Construct } from './ast/_abstract/construct';

export function getConstructConstructor(kind: ConstructKind | any): typeof Construct {
  return spwItemConstructors[kind as ConstructKind] || Construct;
}
