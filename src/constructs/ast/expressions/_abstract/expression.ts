import { ConstructKind } from '../../_types/kinds';
import { Construct } from '../../_abstract/construct';

export abstract class Expression<Kind extends ConstructKind, U extends any = any> extends Construct<
  Kind,
  U
> {}
