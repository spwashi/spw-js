import { spaceNode } from '@grammar/utility/space/space.ref';
import { newline } from '@grammar/utility/space/whitespace.patterns';
import { anyOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';

const _optionalSpaces = {
  name: undefined,
  pattern: zeroOrMoreOf(anyOf([spaceNode, newline])),
};
export default _optionalSpaces;
