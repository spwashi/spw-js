import { PostfixedTransformationExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PostfixedTransformationExpression.name;
export const postfixedTransformationExpression = referenceTo(ruleName);
