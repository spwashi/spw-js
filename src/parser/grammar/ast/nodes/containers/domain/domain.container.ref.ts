import {Domain} from '@constructs/ast';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';

export const ruleName        = Domain.name;
export const domainContainer = combinators.referenceTo(ruleName);