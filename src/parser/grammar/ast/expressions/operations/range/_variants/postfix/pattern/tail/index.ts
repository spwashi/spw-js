import { PostfixedRangeExpression } from '@constructs/ast/expressions/operations/range/_variants/postfixed/expression';
import { rangeOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/range/ref';

export const tailComponent = {
  name: PostfixedRangeExpression.components.tail.name,
  pattern: rangeOperator,
};
