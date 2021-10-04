import { PostfixedPerspectiveExpression } from '@constructs/ast/expressions/operations/perspective/_variants/postfixed/expression';
import { perspectiveOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/perspective/ref';

export const tailComponent = {
  name: PostfixedPerspectiveExpression.components.tail.name,
  pattern: perspectiveOperator,
};
