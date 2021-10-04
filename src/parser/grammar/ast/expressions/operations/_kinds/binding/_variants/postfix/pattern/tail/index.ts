import { PostfixedBindingExpression } from '@constructs/ast/expressions/operations/binding/_variants/postfixed/expression';
import { bindingOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/binding/ref';

export const tailComponent = {
  name: PostfixedBindingExpression.components.tail.name,
  pattern: bindingOperator,
};
