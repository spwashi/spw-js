import { infixedPerformanceExpression } from '../../_variants/infix/ref';
import { postfixedPerformanceExpression } from '../../_variants/postfix/ref';
import { prefixedPerformanceExpression } from '../../_variants/prefix/ref';

export const performanceExpressions = [
  prefixedPerformanceExpression,
  infixedPerformanceExpression,
  postfixedPerformanceExpression,
];
