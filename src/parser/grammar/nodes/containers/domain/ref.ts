import {DomainContainer} from '@constructs/ast';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';

export const ruleName        = DomainContainer.name;
export const domainContainer = combinators.referenceTo(ruleName);