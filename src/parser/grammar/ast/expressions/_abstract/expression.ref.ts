import * as combinators from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = 'Expression';
export const expression = combinators.referenceTo(ruleName);
