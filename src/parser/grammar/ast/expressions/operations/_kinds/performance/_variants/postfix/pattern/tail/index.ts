import { PostfixedPerformanceExpression } from '@constructs/ast/expressions/operations/performance/_variants/postfixed/expression';
import { performanceOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/performance/ref';

export const tailComponent = {
  name: PostfixedPerformanceExpression.components.tail.name,
  pattern: performanceOperator,
};
