import { InfixedReductionExpression } from '@constructs/ast';
import { sequenceExpression } from '@grammar/ast/expressions/sequences/_abstract/sequence.ref';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { channelOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/channel/ref';
import { container } from '@grammar/ast/nodes/containers/_abstract/container.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';

export const headComponent = {
  name: InfixedReductionExpression.components.head.name,
  pattern: anyOf([sequenceExpression, container, node, channelOperator]),
};
