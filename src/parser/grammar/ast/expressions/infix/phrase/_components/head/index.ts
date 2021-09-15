import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { container } from '@grammar/ast/nodes/containers/_abstract/container.ref';
import { sequenceExpression } from '@grammar/ast/expressions/sequence/_abstract/sequence.ref';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';

const _head = {
  name: 'head',
  pattern: anyOf([sequenceExpression, container, node]),
};

export default _head;
