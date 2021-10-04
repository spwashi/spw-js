import { infixedPerspectiveExpressionRule } from '../../_variants/infix/rule';
import { postfixedPerspectiveExpressionRule } from '../../_variants/postfix/rule';
import { prefixedPerspectiveExpressionRule } from '../../_variants/prefix/rule';

export const perspectiveExpressionRules = [
  prefixedPerspectiveExpressionRule,
  infixedPerspectiveExpressionRule,
  postfixedPerspectiveExpressionRule,
];
