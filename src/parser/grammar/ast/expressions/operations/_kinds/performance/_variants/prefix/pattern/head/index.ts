import { PrefixedPerformanceExpression } from '@constructs/ast/expressions/operations/performance/_variants/prefixed/expression';
import { performanceOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/performance/ref';

export const headComponent = {
  name: PrefixedPerformanceExpression.components.head.name,
  pattern: performanceOperator,
};
