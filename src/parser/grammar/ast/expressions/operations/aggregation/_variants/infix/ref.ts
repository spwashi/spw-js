import { InfixedAggregationExpression } from '@constructs/ast/expressions/operations/aggregation/_variants/infixed/expression';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = InfixedAggregationExpression.name;
export const infixedAggregationExpression = referenceTo(ruleName);
