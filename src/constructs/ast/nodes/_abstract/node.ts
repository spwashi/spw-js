import { ConstructKind } from '@constructs/ast/_types/kind';
import { Construct } from '../../_abstract/construct';

export class SpwNode<
  Kind extends ConstructKind = any,
  Item extends any = any,
> extends Construct<Kind, Item> {}
