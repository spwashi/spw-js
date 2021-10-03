import { PrefixedRangeExpression } from '@constructs/ast';
import { expressions } from '@grammar/ast/expressions/_abstract/_list/expressions.list.ref';
import { sequenceExpressions } from '@grammar/ast/expressions/sequences/_abstract/_list/sequences.list.ref';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';

export const itemComponent = {
  name: PrefixedRangeExpression.components.tail.name,
  pattern: anyOf([...expressions.filter((i) => ![...sequenceExpressions].includes(i)), node]),
};
