import * as combinators from '@spwashi/language/parsers/grammar/combinators';

export const ruleName    = 'LabeledAtom';
export const labeledAtom = combinators.referenceTo(ruleName);