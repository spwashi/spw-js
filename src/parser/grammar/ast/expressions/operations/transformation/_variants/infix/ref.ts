import { InfixedTransformationExpression } from '@constructs/ast/expressions/operations/transformation/_variants/infixed/expression';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = InfixedTransformationExpression.name;
export const infixedTransformationExpression = referenceTo(ruleName);
