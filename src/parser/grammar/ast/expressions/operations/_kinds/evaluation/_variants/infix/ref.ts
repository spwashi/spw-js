import { InfixedEvaluationExpression } from '@constructs/ast/expressions/operations/evaluation/_variants/infixed/expression';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = InfixedEvaluationExpression.name;
export const infixedEvaluationExpression = referenceTo(ruleName);
