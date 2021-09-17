import { PrefixedStrandExpression } from '@constructs/ast/expressions/infix/strand/_variants/prefixed/expression';
import { transformationOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/transformation/ref';

export default {
  name: PrefixedStrandExpression.components.operator.name,
  pattern: transformationOperator,
};
