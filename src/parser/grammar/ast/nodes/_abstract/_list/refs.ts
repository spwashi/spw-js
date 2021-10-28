import { behaviorExpression } from '@grammar/ast/expressions/sequences/behavior/ref';
import { entityExpression } from '@grammar/ast/expressions/sequences/entity/ref';
import { instanceExpression } from '@grammar/ast/expressions/sequences/instance/ref';
import { semanticOperators } from '@grammar/ast/nodes/atoms/operators/semantic/_abstract/_list/refs';
import { pragmaticOperators } from '@grammar/ast/nodes/atoms/operators/pragmatic/_abstract/_list/refs';
import { scalars } from '@grammar/ast/nodes/atoms/scalars/_abstract/_list/refs';
import { containerNodes } from '@grammar/ast/nodes/containers/_abstract/_list/refs';

export const nodes = [
  instanceExpression,
  behaviorExpression,
  entityExpression,
  ...scalars,
  ...containerNodes,
];

/**
 * Nodes that represent theoretical operations or constructs
 */
export const abstractNodes = [...containerNodes, ...pragmaticOperators, ...semanticOperators];
