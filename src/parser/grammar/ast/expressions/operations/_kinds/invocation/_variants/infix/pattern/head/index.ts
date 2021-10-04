import { InfixedInvocationExpression } from '@constructs/ast';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';

export const headComponent = {
  name: InfixedInvocationExpression.components.head.name,
  pattern: node,
};
