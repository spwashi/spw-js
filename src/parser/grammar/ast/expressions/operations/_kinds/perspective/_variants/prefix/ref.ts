import { PrefixedPerspectiveExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PrefixedPerspectiveExpression.name;
export const prefixedPerspectiveExpression = referenceTo(ruleName);
