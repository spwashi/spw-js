import { PrefixedTransformationExpression } from '@constructs/ast';
import { expression } from '@grammar/ast/expressions/_abstract/expression.ref';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { container } from '@grammar/ast/nodes/containers/_abstract/container.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';

const _item = {
  name: PrefixedTransformationExpression.components.item.name,
  pattern: anyOf([expression, container, node]),
};

export default _item;
