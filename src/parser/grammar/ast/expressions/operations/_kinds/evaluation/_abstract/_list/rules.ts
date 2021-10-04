import { infixedEvaluationExpressionRule } from '../../_variants/infix/rule';
import { postfixedEvaluationExpressionRule } from '../../_variants/postfix/rule';
import { prefixedEvaluationExpressionRule } from '../../_variants/prefix/rule';

export const evaluationExpressionRules = [
  prefixedEvaluationExpressionRule,
  infixedEvaluationExpressionRule,
  postfixedEvaluationExpressionRule,
];
