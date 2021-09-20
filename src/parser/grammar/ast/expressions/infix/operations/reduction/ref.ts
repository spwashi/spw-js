import { ReductionExpression } from '@constructs/ast/expressions/infix/operations/reduction/expression';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = ReductionExpression.name;
export const reductionExpression = referenceTo(ruleName);
