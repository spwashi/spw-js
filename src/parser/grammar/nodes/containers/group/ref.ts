import {ParentheticalContainer} from '@constructs/ast';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';

export const ruleName  = ParentheticalContainer.name;
export const groupRule = combinators.referenceTo(ruleName);