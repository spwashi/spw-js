import {Group} from '@constructs/ast';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';

export const ruleName  = Group.name;
export const groupRule = combinators.referenceTo(ruleName);