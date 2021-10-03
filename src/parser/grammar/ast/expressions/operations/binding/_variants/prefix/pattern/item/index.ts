import { PrefixedBindingExpression } from '@constructs/ast';
import { expressions } from '@grammar/ast/expressions/_abstract/_list/expressions.list.ref';
import { sequenceExpressions } from '@grammar/ast/expressions/sequences/_abstract/_list/sequences.list.ref';
import { behaviorExpression } from '@grammar/ast/expressions/sequences/behavior/ref';
import { instanceExpression } from '@grammar/ast/expressions/sequences/instance/ref';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { channelOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/channel/ref';
import { container } from '@grammar/ast/nodes/containers/_abstract/container.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';

export const itemComponent = {
  name: PrefixedBindingExpression.components.tail.name,
  pattern: anyOf([
    ...expressions.filter((i) => ![...sequenceExpressions].includes(i)),
    instanceExpression,
    behaviorExpression,
    container,
    node,
    channelOperator,
  ]),
};
