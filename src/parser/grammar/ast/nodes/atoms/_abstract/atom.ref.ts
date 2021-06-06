import * as combinators from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = 'Atom';
export const atomNode = combinators.referenceTo(ruleName);
