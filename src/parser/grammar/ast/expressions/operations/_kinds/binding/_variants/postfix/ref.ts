import { PostfixedBindingExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PostfixedBindingExpression.name;
export const postfixedBindingExpression = referenceTo(ruleName);
