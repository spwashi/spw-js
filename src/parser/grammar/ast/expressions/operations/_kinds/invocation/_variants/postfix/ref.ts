import { PostfixedInvocationExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PostfixedInvocationExpression.name;
export const postfixedInvocationExpression = referenceTo(ruleName);
