import { InfixedPerformanceExpression } from '@constructs/ast';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';

export const headComponent = {
  name: InfixedPerformanceExpression.components.head.name,
  pattern: node,
};
