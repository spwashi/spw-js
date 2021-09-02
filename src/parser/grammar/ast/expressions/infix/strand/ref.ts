import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';
import { StrandExpression } from '@constructs/ast/expressions/infix/strand/expression';

export const ruleName = StrandExpression.name;
export const strandExpression = referenceTo(ruleName);
