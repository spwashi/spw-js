import { PrefixedAggregationExpression } from '@constructs/ast/expressions/infixed/operations/aggregation/_variants/prefixed/expression';
import { aggregationOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/aggregation/ref';

export const operatorComponent = {
  name: PrefixedAggregationExpression.components.head.name,
  pattern: aggregationOperator,
};
