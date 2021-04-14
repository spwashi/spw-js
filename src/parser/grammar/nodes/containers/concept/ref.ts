import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import {ConceptNode} from '@constructs/ast';

export const ruleName    = ConceptNode.name;
export const conceptRule = combinators.referenceTo(ruleName);