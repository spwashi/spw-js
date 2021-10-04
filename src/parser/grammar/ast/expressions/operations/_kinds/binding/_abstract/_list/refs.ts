import { infixedBindingExpression } from '../../_variants/infix/ref';
import { postfixedBindingExpression } from '../../_variants/postfix/ref';
import { prefixedBindingExpression } from '../../_variants/prefix/ref';

export const bindingExpressions = [
  prefixedBindingExpression,
  infixedBindingExpression,
  postfixedBindingExpression,
];
