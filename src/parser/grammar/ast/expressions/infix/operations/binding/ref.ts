import { InfixedBindingExpression } from '@constructs/ast/expressions/infix/operations/binding/_variants/infixed/expression';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = InfixedBindingExpression.name;
export const bindingExpression = referenceTo(ruleName);
