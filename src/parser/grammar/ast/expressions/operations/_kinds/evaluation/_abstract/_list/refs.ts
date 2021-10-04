import { infixedEvaluationExpression } from '../../_variants/infix/ref';
import { postfixedEvaluationExpression } from '../../_variants/postfix/ref';
import { prefixedEvaluationExpression } from '../../_variants/prefix/ref';

export const evaluationExpressions = [
  prefixedEvaluationExpression,
  infixedEvaluationExpression,
  postfixedEvaluationExpression,
];
