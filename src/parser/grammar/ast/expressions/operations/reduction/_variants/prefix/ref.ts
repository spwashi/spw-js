import { PrefixedReductionExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PrefixedReductionExpression.name;
export const prefixedReductionExpression = referenceTo(ruleName);
