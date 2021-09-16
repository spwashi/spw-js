import { PrefixExpression } from '@constructs/ast/expressions/prefix/construct';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PrefixExpression.name;
export const prefixExpression = referenceTo(ruleName);
