import { infixedAggregationExpression } from '../../_variants/infix/ref';
import { postfixedAggregationExpression } from '../../_variants/postfix/ref';
import { prefixedAggregationExpression } from '../../_variants/prefix/ref';

export const aggregationExpressions = [
  prefixedAggregationExpression,
  infixedAggregationExpression,
  postfixedAggregationExpression,
];
