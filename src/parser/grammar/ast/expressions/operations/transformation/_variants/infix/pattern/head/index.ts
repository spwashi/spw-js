import { InfixedTransformationExpression } from '@constructs/ast';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';

export const headComponent = {
  name: InfixedTransformationExpression.components.head.name,
  pattern: node,
};
