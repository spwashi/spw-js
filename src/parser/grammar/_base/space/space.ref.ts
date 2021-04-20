import * as combinators from '@spwashi/language/parsers/grammar/combinators';

export const nodeName  = 'Space';
export const spaceNode = combinators.referenceTo(nodeName).withAction('return null');