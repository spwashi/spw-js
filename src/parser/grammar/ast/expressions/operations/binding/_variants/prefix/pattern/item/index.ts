import { PrefixedBindingExpression } from '@constructs/ast';
import { expressions } from '@grammar/ast/expressions/_abstract/_list/expressions.list.ref';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { channelOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/channel/ref';
import { container } from '@grammar/ast/nodes/containers/_abstract/container.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';

export const itemComponent = {
  name: PrefixedBindingExpression.components.tail.name,
  pattern: anyOf([
    // ...expressions.filter((i) => i !== infixedBindingExpression),
    ...expressions,
    container,
    node,
    channelOperator,
  ]),
};
