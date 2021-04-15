import * as combinators from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = 'Node';
export const node     = combinators.referenceTo(ruleName);