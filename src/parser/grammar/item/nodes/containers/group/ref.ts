import {GroupNode} from '@constructs/ast';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';

export const ruleName  = GroupNode.name;
export const groupRule = combinators.referenceTo(ruleName);