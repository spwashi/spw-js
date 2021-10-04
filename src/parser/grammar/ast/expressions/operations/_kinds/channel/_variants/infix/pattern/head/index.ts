import { InfixedChannelExpression } from '@constructs/ast';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';

export const headComponent = {
  name: InfixedChannelExpression.components.head.name,
  pattern: node,
};
