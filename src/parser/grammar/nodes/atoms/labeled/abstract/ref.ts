import * as combinators from '@spwashi/language/parsers/grammar/combinators';

export const ruleName        = 'LabeledAtom';
export const labeledAtomNode = combinators.referenceTo(ruleName);