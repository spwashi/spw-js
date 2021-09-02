import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';

const head = anyOf([node]);
export default {
  name: 'head',
  pattern: head,
};
