import { PostfixedEvaluationExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PostfixedEvaluationExpression.name;
export const postfixedEvaluationExpression = referenceTo(ruleName);
