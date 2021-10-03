import { PrefixedTransformationExpression } from '@constructs/ast/expressions/operations/transformation/_variants/prefixed/expression';
import { transformationOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/transformation/ref';

export const headComponent = {
  name: PrefixedTransformationExpression.components.head.name,
  pattern: transformationOperator,
};
