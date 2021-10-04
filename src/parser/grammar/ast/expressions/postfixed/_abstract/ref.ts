import { PostfixedExpression } from '@constructs/ast/expressions/_abstract/postfixed/construct';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PostfixedExpression.name;
export const postfixedExpression = referenceTo(ruleName);
