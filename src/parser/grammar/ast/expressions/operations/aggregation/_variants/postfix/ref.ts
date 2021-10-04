import { PostfixedAggregationExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PostfixedAggregationExpression.name;
export const postfixedAggregationExpression = referenceTo(ruleName);
