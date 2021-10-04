import { infixedTransformationExpressionRule } from '../../_variants/infix/rule';
import { postfixedTransformationExpressionRule } from '../../_variants/postfix/rule';
import { prefixedTransformationExpressionRule } from '../../_variants/prefix/rule';

export const transformationExpressionRules = [
  prefixedTransformationExpressionRule,
  infixedTransformationExpressionRule,
  postfixedTransformationExpressionRule,
];
