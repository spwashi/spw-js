import { PostfixedChannelExpression } from '@constructs/ast/expressions/operations/channel/_variants/postfixed/expression';
import { channelOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/channel/ref';

export const tailComponent = {
  name: PostfixedChannelExpression.components.tail.name,
  pattern: channelOperator,
};
