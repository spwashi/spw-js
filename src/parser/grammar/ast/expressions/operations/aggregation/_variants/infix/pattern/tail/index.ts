import { InfixedAggregationExpression } from '@constructs/ast';
import { pattern } from '@grammar/ast/expressions/operations/aggregation/_variants/infix/pattern/tail/pattern';

export const tailComponent = {
  name: InfixedAggregationExpression.components.tail.name,
  pattern: pattern,
};
