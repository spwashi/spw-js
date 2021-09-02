import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';
import { InfixExpression } from '@constructs/ast/expressions/infix/construct';

export const ruleName = InfixExpression.name;

/**
 * Infix Expression rule reference.
 *
 * Nodes separated by a consistent operator.
 */
export const infixExpression = referenceTo(ruleName);
