import { InfixedEvaluationExpression } from '@constructs/ast';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';

export const headComponent = {
  name: InfixedEvaluationExpression.components.head.name,
  pattern: node,
};
