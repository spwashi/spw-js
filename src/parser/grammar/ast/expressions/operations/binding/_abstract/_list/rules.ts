import { infixedBindingExpressionRule } from '../../_variants/infix/rule';
import { postfixedBindingExpressionRule } from '../../_variants/postfix/rule';
import { prefixedBindingExpressionRule } from '../../_variants/prefix/rule';

export const bindingExpressionRules = [
  prefixedBindingExpressionRule,
  infixedBindingExpressionRule,
  postfixedBindingExpressionRule,
];
