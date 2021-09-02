import { spaceNode } from '@grammar/utility/space/space.ref';
import { zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';

const _optionalSpaces = {
  name: undefined,
  pattern: zeroOrMoreOf(spaceNode),
};
export default _optionalSpaces;
