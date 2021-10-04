import { infixedChannelExpression } from '../../_variants/infix/ref';
import { postfixedChannelExpression } from '../../_variants/postfix/ref';
import { prefixedChannelExpression } from '../../_variants/prefix/ref';

export const channelExpressions = [
  prefixedChannelExpression,
  infixedChannelExpression,
  postfixedChannelExpression,
];
