import { InfixedPerformanceExpression } from '@constructs/ast/expressions/operations/performance/_variants/infixed/expression';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = InfixedPerformanceExpression.name;
export const infixedPerformanceExpression = referenceTo(ruleName);
