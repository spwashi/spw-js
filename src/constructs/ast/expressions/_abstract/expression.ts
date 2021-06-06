import { ConstructKind } from '../../_types/kind';
import { Construct } from '../../_abstract/construct';

export abstract class SpwExpression<
  Kind extends ConstructKind,
  U extends any = any,
> extends Construct<Kind, U> {}
