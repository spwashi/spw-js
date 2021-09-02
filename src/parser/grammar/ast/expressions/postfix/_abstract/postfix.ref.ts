import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';
import { PostfixExpression } from '@constructs/ast/expressions/postfix/construct';

export const ruleName = PostfixExpression.name;

/**
 * Postfix Expression rule reference.
 *
 * An operator preceded by an infix or prefix expression
 */
export const postfixExpression = referenceTo(ruleName);
