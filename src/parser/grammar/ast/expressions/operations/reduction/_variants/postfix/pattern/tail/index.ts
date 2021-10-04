import { PostfixedReductionExpression } from '@constructs/ast/expressions/operations/reduction/_variants/postfixed/expression';
import { reductionOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/reduction/ref';

export const tailComponent = {
  name: PostfixedReductionExpression.components.tail.name,
  pattern: reductionOperator,
};
