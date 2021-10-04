import { PostfixedPerspectiveExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PostfixedPerspectiveExpression.name;
export const postfixedPerspectiveExpression = referenceTo(ruleName);
