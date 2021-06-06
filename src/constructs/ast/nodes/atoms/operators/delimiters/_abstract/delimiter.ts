import { ConstructKind } from '@constructs/ast/_types/kind';
import SpwOperator from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

export class SpwDelimiter<
  Kind extends ConstructKind = any,
> extends SpwOperator<Kind> {
  static token = 'unknown';
}
