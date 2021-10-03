import { PostfixedTransformationExpression } from '@constructs/ast/expressions/operations/transformation/_variants/postfixed/expression';
import { transformationOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/transformation/ref';

export const tailComponent = {
  name: PostfixedTransformationExpression.components.tail.name,
  pattern: transformationOperator,
};
