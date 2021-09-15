import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';
import { AggregationExpression } from '@constructs/ast/expressions/infix/operations/aggregation/expression';

export const ruleName = AggregationExpression.name;
export const aggregationExpression = referenceTo(ruleName);
