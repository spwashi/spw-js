import { behaviorExpression } from '@grammar/ast/expressions/sequences/behavior/ref';
import { entityExpression } from '@grammar/ast/expressions/sequences/entity/ref';
import { instanceExpression } from '@grammar/ast/expressions/sequences/instance/ref';
import { semanticOperators } from '@grammar/ast/nodes/atoms/operators/delimiters/_abstract/_list/delimiter.list.ref';
import { pragmaticOperators } from '@grammar/ast/nodes/atoms/operators/pragmatic/_abstract/_list/operator.list.ref';
import { channelOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/channel/ref';
import { scalars } from '@grammar/ast/nodes/atoms/scalars/_abstract/_list/scalar.list.ref';
import { containerNodes } from '@grammar/ast/nodes/containers/_abstract/_list/container.list.ref';

export const nodes = [
  instanceExpression,
  behaviorExpression,
  entityExpression,
  ...scalars,
  ...containerNodes,
  channelOperator,
];

/**
 * Nodes that represent theoretical operations or constructs
 */
export const abstractNodes = [...containerNodes, ...pragmaticOperators, ...semanticOperators];
