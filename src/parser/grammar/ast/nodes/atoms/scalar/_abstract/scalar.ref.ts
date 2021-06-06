import * as combinators from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = 'Scalar';
export const scalar = combinators.referenceTo(ruleName);
