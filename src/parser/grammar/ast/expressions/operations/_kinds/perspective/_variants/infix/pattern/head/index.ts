import { InfixedPerspectiveExpression } from '@constructs/ast';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';

export const headComponent = {
  name: InfixedPerspectiveExpression.components.head.name,
  pattern: node,
};
