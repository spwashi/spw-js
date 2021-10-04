import { InfixedBindingExpression } from '@constructs/ast';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';

export const headComponent = {
  name: InfixedBindingExpression.components.head.name,
  pattern: node,
};
