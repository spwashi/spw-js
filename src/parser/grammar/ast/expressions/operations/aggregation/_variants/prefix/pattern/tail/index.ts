import { PrefixedAggregationExpression } from '@constructs/ast';
import { expressions } from '@grammar/ast/expressions/_abstract/_list/expressions.list.ref';
import { sequenceExpressions } from '@grammar/ast/expressions/sequences/_abstract/_list/sequences.list.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';

export const itemComponent = {
  name: PrefixedAggregationExpression.components.tail.name,
  pattern: anyOf([...expressions.filter((i) => ![...sequenceExpressions].includes(i)), node]),
};
