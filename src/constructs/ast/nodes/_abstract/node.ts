import { ConstructKind } from '@constructs/top/kinds';
import { Construct } from '../../_abstract/construct';

export class Node<Kind extends ConstructKind = any, Item extends any = any> extends Construct<
  Kind,
  Item
> {}
