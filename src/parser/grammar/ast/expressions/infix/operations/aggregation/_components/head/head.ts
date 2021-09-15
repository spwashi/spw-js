import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { container } from '@grammar/ast/nodes/containers/_abstract/container.ref';

const head = anyOf([container, node]);
export default {
  name: 'head',
  pattern: head,
};
