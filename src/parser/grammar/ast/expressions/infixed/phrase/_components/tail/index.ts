import { sequenceExpression } from '@grammar/ast/expressions/sequences/_abstract/ref';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { container } from '@grammar/ast/nodes/containers/_abstract/container.ref';
import { spaceTab } from '@grammar/utility/space/whitespace.patterns';
import { anyOf, oneOrMoreOf, sequenceOf } from '@spwashi/language/parsers/grammar/combinators';

const allowedElements = [sequenceExpression, container, node];
const _delimiter = {
  name: undefined,
  pattern: oneOrMoreOf(spaceTab),
};
const _tailSegment = sequenceOf([_delimiter.pattern, anyOf(allowedElements).named('tail')]);
const _tail = {
  name: 'tail',
  pattern: oneOrMoreOf(_tailSegment.withAction(`return tail`)),
};

export default _tail;
