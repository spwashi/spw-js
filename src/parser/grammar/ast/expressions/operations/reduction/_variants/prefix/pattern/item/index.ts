import { PrefixedReductionExpression } from '@constructs/ast';
import { expressions } from '@grammar/ast/expressions/_abstract/_list/expressions.list.ref';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { channelOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/channel/ref';
import { container } from '@grammar/ast/nodes/containers/_abstract/container.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';

export const itemComponent = {
  name: PrefixedReductionExpression.components.tail.name,
  pattern: anyOf([
    // ...expressions.filter((i) => i !== infixedReductionExpression),
    ...expressions,
    container,
    node,
    channelOperator,
  ]),
};
