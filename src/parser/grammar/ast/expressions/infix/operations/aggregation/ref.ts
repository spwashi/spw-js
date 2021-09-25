import { AggregationExpression } from '@constructs/ast/expressions/infix/operations/aggregation/_variants/infixed/expression';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = AggregationExpression.name;
export const aggregationExpression = referenceTo(ruleName);
