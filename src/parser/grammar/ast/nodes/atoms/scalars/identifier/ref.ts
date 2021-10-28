import { IdentifierNode } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = IdentifierNode.name;
export const identifierNode = referenceTo(ruleName);
