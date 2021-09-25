import { PrefixedTransformationExpression } from '@constructs/ast/expressions/infix/operations/transformation/_variants/prefixed/expression';
import { transformationOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/transformation/ref';

export default {
  name: PrefixedTransformationExpression.components.operator.name,
  pattern: transformationOperator,
};
