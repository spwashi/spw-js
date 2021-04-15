import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import {ConceptualContainer} from '@constructs/ast';

export const ruleName    = ConceptualContainer.name;
export const conceptRule = combinators.referenceTo(ruleName);