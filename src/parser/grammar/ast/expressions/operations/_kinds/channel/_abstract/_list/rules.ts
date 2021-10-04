import { infixedChannelExpressionRule } from '../../_variants/infix/rule';
import { postfixedChannelExpressionRule } from '../../_variants/postfix/rule';
import { prefixedChannelExpressionRule } from '../../_variants/prefix/rule';

export const channelExpressionRules = [
  prefixedChannelExpressionRule,
  infixedChannelExpressionRule,
  postfixedChannelExpressionRule,
];
