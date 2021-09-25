import { PrefixedBindingExpression } from '@constructs/ast/expressions/infix/operations/binding/_variants/prefixed/expression';
import { bindingOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/binding/ref';

export default {
  name: PrefixedBindingExpression.components.operator.name,
  pattern: bindingOperator,
};
