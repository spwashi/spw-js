import { PostfixExpression } from '@constructs/ast/expressions/postfixed/construct';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PostfixExpression.name;
export const postfixedExpression = referenceTo(ruleName);
