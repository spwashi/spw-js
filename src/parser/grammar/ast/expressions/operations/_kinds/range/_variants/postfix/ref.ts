import { PostfixedRangeExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PostfixedRangeExpression.name;
export const postfixedRangeExpression = referenceTo(ruleName);
