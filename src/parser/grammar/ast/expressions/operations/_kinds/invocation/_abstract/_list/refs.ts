import { infixedInvocationExpression } from '../../_variants/infix/ref';
import { postfixedInvocationExpression } from '../../_variants/postfix/ref';
import { prefixedInvocationExpression } from '../../_variants/prefix/ref';

export const invocationExpressions = [
  prefixedInvocationExpression,
  infixedInvocationExpression,
  postfixedInvocationExpression,
];
