import { InfixExpression } from '@constructs/ast/expressions/infix/construct';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = InfixExpression.name;

/**
 * Infix Expression rule reference.
 *
 * Nodes separated by a consistent operator.
 */
export const infixExpression = referenceTo(ruleName);
