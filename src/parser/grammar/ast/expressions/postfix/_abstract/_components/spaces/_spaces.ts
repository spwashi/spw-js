import { spaceNode } from '@grammar/utility/space/space.ref';
import { zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';

export default {
  name: undefined,
  pattern: zeroOrMoreOf(spaceNode),
};
