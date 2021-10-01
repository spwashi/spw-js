import { PrefixedAggregationExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PrefixedAggregationExpression.name;
export const prefixedAggregationExpression = referenceTo(ruleName);
