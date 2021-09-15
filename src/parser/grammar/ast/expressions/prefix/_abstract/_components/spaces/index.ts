import { spaceNode } from '@grammar/utility/space/space.ref';
import { anyOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';
import { newline } from '@grammar/utility/space/whitespace.patterns';

const _optionalSpaces = {
  name: undefined,
  pattern: zeroOrMoreOf(anyOf([spaceNode, newline])),
};
export default _optionalSpaces;
