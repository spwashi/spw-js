import { InfixedAggregationExpression } from '@constructs/ast';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';

export const headComponent = {
  name: InfixedAggregationExpression.components.head.name,
  pattern: node,
};
