import { PrefixExpression } from '@constructs/ast/expressions/prefixed/construct';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PrefixExpression.name;
export const prefixedExpression = referenceTo(ruleName);
