import { PrefixedInvocationExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PrefixedInvocationExpression.name;
export const prefixedInvocationExpression = referenceTo(ruleName);
