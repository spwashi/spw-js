import { PrefixedPerformanceExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PrefixedPerformanceExpression.name;
export const prefixedPerformanceExpression = referenceTo(ruleName);
