import { PostfixedReductionExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PostfixedReductionExpression.name;
export const postfixedReductionExpression = referenceTo(ruleName);
