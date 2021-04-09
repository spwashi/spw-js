import {ChannelNode} from '@constructs/item';
import initRuleFromSpwNode from '../../util/initLabeledAtomRule';


const {rule, referencePattern}      = initRuleFromSpwNode(ChannelNode);
export const channelNodeRule        = rule;
export const channelNodeRulePattern = referencePattern;
