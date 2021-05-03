import {anyOf, oneOrMoreOf, regExpLike, zeroOrMoreOf} from '@spwashi/language/parsers/grammar/combinators';

export const spaceTab          = regExpLike('\\t ');
export const newlineCombinator = regExpLike('\\n,');

const _patterns = [spaceTab, newlineCombinator.named('newline')];

// language=JavaScript
const action                              = 'return newline';
export const optionalWhitespaceCombinator = zeroOrMoreOf(anyOf(_patterns).withAction(action));
export const whitespaceCombinator         = oneOrMoreOf(anyOf(_patterns).withAction(action));