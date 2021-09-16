import { PostfixExpression } from '@constructs/ast/expressions/postfix/construct';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PostfixExpression.name;

/**
 * Postfix Expression rule reference.
 *
 * An operator preceded by an infix or prefix expression
 */
export const postfixExpression = referenceTo(ruleName);
