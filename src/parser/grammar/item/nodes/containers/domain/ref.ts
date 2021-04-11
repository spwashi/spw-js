import {DomainNode} from '@constructs/ast';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';

export const ruleName   = DomainNode.name;
export const domainRule = combinators.referenceTo(ruleName);