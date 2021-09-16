import { CommonExpressionTail } from '@constructs/ast';
import { expression } from '@grammar/ast/expressions/_abstract/expression.ref';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';

const _item = {
  name: CommonExpressionTail.components.item.name,
  pattern: anyOf([expression, node]),
};

export default _item;
