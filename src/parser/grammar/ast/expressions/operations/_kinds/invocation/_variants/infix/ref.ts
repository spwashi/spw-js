import { InfixedInvocationExpression } from '@constructs/ast/expressions/operations/invocation/_variants/infixed/expression';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = InfixedInvocationExpression.name;
export const infixedInvocationExpression = referenceTo(ruleName);
