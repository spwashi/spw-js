import {PerformanceNode} from '@constructs/item';
import initLabeledAtomRule from '../../util/initLabeledAtomRule';

const {rule, referencePattern}          = initLabeledAtomRule(PerformanceNode);
export const performanceNodeRule        = rule;
export const performanceNodeRulePattern = referencePattern;
