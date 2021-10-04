import { infixedReductionExpression } from '../../_variants/infix/ref';
import { postfixedReductionExpression } from '../../_variants/postfix/ref';
import { prefixedReductionExpression } from '../../_variants/prefix/ref';

export const reductionExpressions = [
  prefixedReductionExpression,
  infixedReductionExpression,
  postfixedReductionExpression,
];
