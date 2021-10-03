import { sequenceExpression } from '@grammar/ast/expressions/sequences/_abstract/ref';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { container } from '@grammar/ast/nodes/containers/_abstract/container.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';

const _head = {
  name: 'head',
  pattern: anyOf([sequenceExpression, container, node]),
};

export default _head;
