import { PostfixedInvocationExpression } from '@constructs/ast/expressions/operations/invocation/_variants/postfixed/expression';
import { invocationOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/invocation/ref';

export const tailComponent = {
  name: PostfixedInvocationExpression.components.tail.name,
  pattern: invocationOperator,
};
