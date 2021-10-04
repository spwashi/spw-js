import { InfixedRangeExpression } from '@constructs/ast';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';

export const headComponent = {
  name: InfixedRangeExpression.components.head.name,
  pattern: node,
};
