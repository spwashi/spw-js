import { InfixedTransformationExpression } from '@constructs/ast/expressions/infix/operations/transformation/_variants/infixed/expression';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = InfixedTransformationExpression.name;
export const transformationExpression = referenceTo(ruleName);
