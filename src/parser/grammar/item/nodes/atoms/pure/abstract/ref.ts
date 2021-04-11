import * as combinators from '@spwashi/language/parsers/grammar/combinators';

export const ruleName     = 'PureAtom';
export const pureAtomNode = combinators.referenceTo(ruleName);