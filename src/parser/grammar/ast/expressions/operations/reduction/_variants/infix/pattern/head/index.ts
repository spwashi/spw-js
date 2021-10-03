import { InfixedReductionExpression } from '@constructs/ast';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';

export const headComponent = {
  name: InfixedReductionExpression.components.head.name,
  pattern: node,
};
