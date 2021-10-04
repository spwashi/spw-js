import { PrefixedBindingExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PrefixedBindingExpression.name;
export const prefixedBindingExpression = referenceTo(ruleName);
