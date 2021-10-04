import { PrefixedEvaluationExpression } from '@constructs/ast/expressions/operations/evaluation/_variants/prefixed/expression';
import { evaluationOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/evaluation/ref';

export const headComponent = {
  name: PrefixedEvaluationExpression.components.head.name,
  pattern: evaluationOperator,
};
