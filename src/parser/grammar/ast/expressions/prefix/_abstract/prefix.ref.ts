import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';
import { PrefixExpression } from '@constructs/ast/expressions/prefix/construct';

export const ruleName = PrefixExpression.name;
export const prefixExpression = referenceTo(ruleName);
