import { infixedTransformationExpression } from '@grammar/ast/expressions/operations/transformation/_variants/infix/ref';
import { postfixedTransformationExpression } from '@grammar/ast/expressions/operations/transformation/_variants/postfix/ref';
import { prefixedTransformationExpression } from '@grammar/ast/expressions/operations/transformation/_variants/prefix/ref';

export const transformationExpressions = [
  prefixedTransformationExpression,
  infixedTransformationExpression,
  postfixedTransformationExpression,
];
