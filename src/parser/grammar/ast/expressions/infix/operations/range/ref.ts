import { InfixedRangeExpression } from '@constructs/ast/expressions/infix/operations/range/_variants/infixed/expression';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = InfixedRangeExpression.name;
export const rangeExpression = referenceTo(ruleName);
