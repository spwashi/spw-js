import * as combinators from '@spwashi/language/parsers/grammar/combinators';

export const ruleName  = 'Space';
export const spaceNode = combinators.referenceTo(ruleName).withAction('return null');