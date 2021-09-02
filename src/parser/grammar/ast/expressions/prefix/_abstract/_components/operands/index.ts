import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { expression } from '@grammar/ast/expressions/_abstract/expression.ref';

const _operands = {
  name: 'operands',
  pattern: anyOf([expression, node]),
};
export default _operands;
