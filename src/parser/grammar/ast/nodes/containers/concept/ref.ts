import { Concept } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = Concept.name;
export const concept = referenceTo(ruleName);
