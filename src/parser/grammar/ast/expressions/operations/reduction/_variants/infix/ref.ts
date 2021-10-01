import { InfixedReductionExpression } from '@constructs/ast/expressions/infixed/operations/reduction/_variants/infixed/expression';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = InfixedReductionExpression.name;
export const infixedReductionExpression = referenceTo(ruleName);
