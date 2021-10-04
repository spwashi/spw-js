import { PrefixedEvaluationExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PrefixedEvaluationExpression.name;
export const prefixedEvaluationExpression = referenceTo(ruleName);
