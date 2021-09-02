import { Location } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = Location.name;
export const location = referenceTo(ruleName);
