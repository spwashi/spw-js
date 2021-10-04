import { infixedTransformationExpression } from '../../_variants/infix/ref';
import { postfixedTransformationExpression } from '../../_variants/postfix/ref';
import { prefixedTransformationExpression } from '../../_variants/prefix/ref';

export const transformationExpressions = [
  prefixedTransformationExpression,
  infixedTransformationExpression,
  postfixedTransformationExpression,
];
