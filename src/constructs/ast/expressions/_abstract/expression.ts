import { Construct } from '../../_abstract/construct';
import { ConstructKind } from '../../../top/kinds';

export abstract class Expression<Kind extends ConstructKind, U extends any = any> extends Construct<
  Kind,
  U
> {}
