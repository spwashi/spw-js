import { PrefixedTransformationExpression } from '@constructs/ast/expressions/infixed/operations/transformation/_variants/prefixed/expression';
import { transformationOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/transformation/ref';

export const operatorComponent = {
  name: PrefixedTransformationExpression.components.head.name,
  pattern: transformationOperator,
};
