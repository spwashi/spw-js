import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';
import { CommonExpression } from '@constructs/ast/expressions/infix/common/expression';

export const ruleName = CommonExpression.name;
export const commonExpression = referenceTo(ruleName);
