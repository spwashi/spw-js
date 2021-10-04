import { InfixedExpression } from '@constructs/ast/expressions/_abstract/infixed/construct';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = InfixedExpression.name;
export const infixedExpression = referenceTo(ruleName);
