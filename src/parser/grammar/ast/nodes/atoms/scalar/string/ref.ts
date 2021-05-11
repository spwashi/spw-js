import {StringNode} from '@constructs/ast';
import {referenceTo} from '@spwashi/language/parsers/grammar/combinators';

export const ruleName   = StringNode.name;
export const stringNode = referenceTo(ruleName);