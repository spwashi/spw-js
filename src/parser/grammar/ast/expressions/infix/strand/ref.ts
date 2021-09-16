import { StrandExpression } from '@constructs/ast/expressions/infix/strand/expression';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = StrandExpression.name;
export const strandExpression = referenceTo(ruleName);
