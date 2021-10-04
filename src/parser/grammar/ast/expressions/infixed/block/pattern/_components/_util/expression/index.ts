import { expression } from '@grammar/ast/expressions/_abstract/ref';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { channelOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/channel/ref';
import { container } from '@grammar/ast/nodes/containers/_abstract/ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';

export const expressionComponent = {
  name: 'expression',
  pattern: anyOf([expression, container, node, channelOperator]),
};
