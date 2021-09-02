import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { containerNode } from '@grammar/ast/nodes/containers/_abstract/container.ref';
import { sequenceExpression } from '@grammar/ast/expressions/sequence/_abstract/sequence.ref';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';

const allowedElements = [sequenceExpression, containerNode, node];

const _head = {
  name: 'head',
  pattern: anyOf(allowedElements),
};

export default _head;
