import { infixedAggregationExpressionRule } from '../../_variants/infix/rule';
import { postfixedAggregationExpressionRule } from '../../_variants/postfix/rule';
import { prefixedAggregationExpressionRule } from '../../_variants/prefix/rule';

export const aggregationExpressionRules = [
  prefixedAggregationExpressionRule,
  infixedAggregationExpressionRule,
  postfixedAggregationExpressionRule,
];
