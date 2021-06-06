import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import { StrandExpression } from '@constructs/ast/expressions/relational/strand/expression';

export const ruleName = StrandExpression.name;
export const strandExpression = combinators.referenceTo(ruleName);
