import {InvocationNode} from '@constructs/item';
import initRuleFromSpwNode from '../../util/initLabeledAtomRule';

const {rule, referencePattern}         = initRuleFromSpwNode(InvocationNode);
export const invocationNodeRule        = rule;
export const invocationNodeRulePattern = referencePattern;

