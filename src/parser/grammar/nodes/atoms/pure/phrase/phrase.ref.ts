import * as combinators from '@spwashi/language/parsers/grammar/combinators';

export const ruleName   = 'Phrase';
export const phraseNode = combinators.referenceTo(ruleName);