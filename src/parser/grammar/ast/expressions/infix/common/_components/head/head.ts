import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';

const head = anyOf([node]);
export default {
  name: 'head',
  pattern: head,
};
