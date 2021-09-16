import { expression } from '@grammar/ast/expressions/_abstract/expression.ref';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';

const _operands = {
  name: 'operands',
  pattern: anyOf([expression, node]),
};
export default _operands;
