import { infixedPerspectiveExpression } from '../../_variants/infix/ref';
import { postfixedPerspectiveExpression } from '../../_variants/postfix/ref';
import { prefixedPerspectiveExpression } from '../../_variants/prefix/ref';

export const perspectiveExpressions = [
  prefixedPerspectiveExpression,
  infixedPerspectiveExpression,
  postfixedPerspectiveExpression,
];
