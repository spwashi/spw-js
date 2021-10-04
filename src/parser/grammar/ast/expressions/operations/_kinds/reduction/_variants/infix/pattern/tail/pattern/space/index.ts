import { spaceNode } from '@grammar/utility/space/space.ref';
import { zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';

export const spaceComponent = zeroOrMoreOf(spaceNode);
