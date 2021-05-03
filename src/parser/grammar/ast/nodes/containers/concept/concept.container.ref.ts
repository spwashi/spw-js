import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import {Concept} from '@constructs/ast';

export const ruleName    = Concept.name;
export const conceptRule = combinators.referenceTo(ruleName);