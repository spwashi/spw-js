import * as combinators from '@spwashi/language/parsers/grammar/combinators';

export const ruleName      = 'ContainerNode';
export const containerNode = combinators.referenceTo(ruleName);