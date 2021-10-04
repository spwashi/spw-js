import { PrefixedInvocationExpression } from '@constructs/ast/expressions/operations/invocation/_variants/prefixed/expression';
import { invocationOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/invocation/ref';

export const headComponent = {
  name: PrefixedInvocationExpression.components.head.name,
  pattern: invocationOperator,
};
