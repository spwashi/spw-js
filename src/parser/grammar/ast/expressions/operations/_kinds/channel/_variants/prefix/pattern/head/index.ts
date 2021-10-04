import { PrefixedChannelExpression } from '@constructs/ast/expressions/operations/channel/_variants/prefixed/expression';
import { channelOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/channel/ref';

export const headComponent = {
  name: PrefixedChannelExpression.components.head.name,
  pattern: channelOperator,
};
