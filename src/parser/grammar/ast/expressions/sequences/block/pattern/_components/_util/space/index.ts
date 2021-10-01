import { newline, space, spaceTab } from '@grammar/utility/space/whitespace.patterns';
import { anyOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';

export const __ = zeroOrMoreOf(anyOf([space, newline, spaceTab]));
