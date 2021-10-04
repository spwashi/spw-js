import { infixedInvocationExpressionRule } from '../../_variants/infix/rule';
import { postfixedInvocationExpressionRule } from '../../_variants/postfix/rule';
import { prefixedInvocationExpressionRule } from '../../_variants/prefix/rule';

export const invocationExpressionRules = [
  prefixedInvocationExpressionRule,
  infixedInvocationExpressionRule,
  postfixedInvocationExpressionRule,
];
