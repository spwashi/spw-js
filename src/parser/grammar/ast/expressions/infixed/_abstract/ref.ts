import { InfixedExpression } from '@constructs/ast/expressions/infixed/construct';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = InfixedExpression.name;
export const infixedExpression = referenceTo(ruleName);
