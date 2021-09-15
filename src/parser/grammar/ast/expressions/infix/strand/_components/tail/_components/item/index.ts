import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { StrandExpressionTail } from '@constructs/ast';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { expression } from '@grammar/ast/expressions/_abstract/expression.ref';

const _item = {
  name: StrandExpressionTail.components.item.name,
  pattern: anyOf([expression, node]),
};

export default _item;
