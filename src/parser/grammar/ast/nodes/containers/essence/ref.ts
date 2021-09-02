import { Essence } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = Essence.name;
export const essence = referenceTo(ruleName);
