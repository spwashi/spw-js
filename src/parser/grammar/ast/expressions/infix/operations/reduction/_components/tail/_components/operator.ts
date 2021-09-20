import { PrefixedReductionExpression } from '@constructs/ast/expressions/infix/operations/reduction/_variants/prefixed/expression';
import { reductionOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/reduction/ref';

export default {
  name: PrefixedReductionExpression.components.operator.name,
  pattern: reductionOperator,
};
