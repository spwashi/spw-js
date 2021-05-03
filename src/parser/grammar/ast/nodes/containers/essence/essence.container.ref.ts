import {Essence} from '@constructs/ast';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';

export const ruleName           = Essence.name;
export const essentialContainer = combinators.referenceTo(ruleName);