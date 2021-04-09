import {PerspectiveNode} from '@constructs/item';
import initRuleFromSpwNode from '../../util/initLabeledAtomRule';


const {rule, referencePattern}          = initRuleFromSpwNode(PerspectiveNode);
export const perspectiveNodeRule        = rule;
export const perspectiveNodeRulePattern = referencePattern;
