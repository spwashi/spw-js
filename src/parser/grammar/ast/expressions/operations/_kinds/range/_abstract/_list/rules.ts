import { infixedRangeExpressionRule } from '../../_variants/infix/rule';
import { postfixedRangeExpressionRule } from '../../_variants/postfix/rule';
import { prefixedRangeExpressionRule } from '../../_variants/prefix/rule';

export const rangeExpressionRules = [
  prefixedRangeExpressionRule,
  infixedRangeExpressionRule,
  postfixedRangeExpressionRule,
];
