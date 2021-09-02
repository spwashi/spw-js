import { getOperatorRule } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';
import { ChannelOperator } from '@constructs/ast';

export const channelOperatorRule = getOperatorRule(ChannelOperator);
