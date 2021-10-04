import { infixedPerformanceExpressionRule } from '../../_variants/infix/rule';
import { postfixedPerformanceExpressionRule } from '../../_variants/postfix/rule';
import { prefixedPerformanceExpressionRule } from '../../_variants/prefix/rule';

export const performanceExpressionRules = [
  prefixedPerformanceExpressionRule,
  infixedPerformanceExpressionRule,
  postfixedPerformanceExpressionRule,
];
