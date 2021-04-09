import {EvaluationNode} from '@constructs/item';
import initRuleFromSpwNode from '../../util/initLabeledAtomRule';

const {rule, referencePattern}         = initRuleFromSpwNode(EvaluationNode);
export const evaluationNodeRule        = rule;
export const evaluationNodeRulePattern = referencePattern;
