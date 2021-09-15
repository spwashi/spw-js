import { AggregationExpressionTail } from '@constructs/ast/expressions/infix/operations/aggregation/_components/tail';
import { aggregationOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/aggregation/ref';

export default {
  name: AggregationExpressionTail.components.operator.name,
  pattern: aggregationOperator,
};
