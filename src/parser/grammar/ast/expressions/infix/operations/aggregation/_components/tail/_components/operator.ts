import { PrefixedAggregationExpression } from '@constructs/ast/expressions/infix/operations/aggregation/_variants/prefixed/expression';
import { aggregationOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/aggregation/ref';

export default {
  name: PrefixedAggregationExpression.components.operator.name,
  pattern: aggregationOperator,
};
