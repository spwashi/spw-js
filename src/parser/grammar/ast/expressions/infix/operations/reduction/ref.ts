import { InfixedReductionExpression } from '@constructs/ast/expressions/infix/operations/reduction/_variants/infixed/expression';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = InfixedReductionExpression.name;
export const reductionExpression = referenceTo(ruleName);
