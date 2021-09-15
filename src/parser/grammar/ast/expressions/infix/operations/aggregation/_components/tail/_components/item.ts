import { AggregationExpressionTail } from '@constructs/ast';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { expression } from '@grammar/ast/expressions/_abstract/expression.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';

const _item = {
  name: AggregationExpressionTail.components.item.name,
  pattern: anyOf([expression, node]),
};

export default _item;
