import { PrefixedBindingExpression } from '@constructs/ast/expressions/infixed/operations/binding/_variants/prefixed/expression';
import { bindingOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/binding/ref';

export const operatorComponent = {
  name: PrefixedBindingExpression.components.head.name,
  pattern: bindingOperator,
};
