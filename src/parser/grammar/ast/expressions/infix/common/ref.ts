import { CommonExpression } from '@constructs/ast/expressions/infix/common/expression';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = CommonExpression.name;
export const commonExpression = referenceTo(ruleName);
