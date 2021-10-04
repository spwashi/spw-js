import { PostfixedAggregationExpression } from '@constructs/ast/expressions/operations/aggregation/_variants/postfixed/expression';
import { aggregationOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/aggregation/ref';

export const tailComponent = {
  name: PostfixedAggregationExpression.components.tail.name,
  pattern: aggregationOperator,
};
