import { PostfixedPerformanceExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PostfixedPerformanceExpression.name;
export const postfixedPerformanceExpression = referenceTo(ruleName);
