import { PrefixedRangeExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PrefixedRangeExpression.name;
export const prefixedRangeExpression = referenceTo(ruleName);
