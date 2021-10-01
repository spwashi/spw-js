import { InfixedBindingExpression } from '@constructs/ast';
import { pattern } from '@grammar/ast/expressions/operations/binding/_variants/infix/pattern/tail/pattern';

export const tailComponent = {
  name: InfixedBindingExpression.components.tail.name,
  pattern: pattern,
};
