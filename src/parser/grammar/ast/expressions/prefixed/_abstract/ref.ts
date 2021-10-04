import { PrefixedExpression } from '@constructs/ast/expressions/_abstract/prefixed/construct';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PrefixedExpression.name;
export const prefixedExpression = referenceTo(ruleName);
