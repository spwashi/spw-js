import { PostfixedEvaluationExpression } from '@constructs/ast/expressions/operations/evaluation/_variants/postfixed/expression';
import { evaluationOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/evaluation/ref';

export const tailComponent = {
  name: PostfixedEvaluationExpression.components.tail.name,
  pattern: evaluationOperator,
};
