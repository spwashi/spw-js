import { PrefixedTransformationExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PrefixedTransformationExpression.name;
export const prefixedTransformationExpression = referenceTo(ruleName);
