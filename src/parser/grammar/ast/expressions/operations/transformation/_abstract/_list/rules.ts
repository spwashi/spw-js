import { infixedTransformationExpressionRule } from '@grammar/ast/expressions/operations/transformation/_variants/infix/rule';
import { postfixedTransformationExpressionRule } from '@grammar/ast/expressions/operations/transformation/_variants/postfix/rule';
import { prefixedTransformationExpressionRule } from '@grammar/ast/expressions/operations/transformation/_variants/prefix/rule';

export const transformationExpressionRules = [
  prefixedTransformationExpressionRule,
  infixedTransformationExpressionRule,
  postfixedTransformationExpressionRule,
];
