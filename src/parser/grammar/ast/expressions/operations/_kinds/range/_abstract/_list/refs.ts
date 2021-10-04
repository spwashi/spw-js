import { infixedRangeExpression } from '../../_variants/infix/ref';
import { postfixedRangeExpression } from '../../_variants/postfix/ref';
import { prefixedRangeExpression } from '../../_variants/prefix/ref';

export const rangeExpressions = [
  prefixedRangeExpression,
  infixedRangeExpression,
  postfixedRangeExpression,
];
