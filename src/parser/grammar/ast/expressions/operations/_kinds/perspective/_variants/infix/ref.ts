import { InfixedPerspectiveExpression } from '@constructs/ast/expressions/operations/perspective/_variants/infixed/expression';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = InfixedPerspectiveExpression.name;
export const infixedPerspectiveExpression = referenceTo(ruleName);
