import { infixedReductionExpressionRule } from '../../_variants/infix/rule';
import { postfixedReductionExpressionRule } from '../../_variants/postfix/rule';
import { prefixedReductionExpressionRule } from '../../_variants/prefix/rule';

export const reductionExpressionRules = [
  prefixedReductionExpressionRule,
  infixedReductionExpressionRule,
  postfixedReductionExpressionRule,
];
