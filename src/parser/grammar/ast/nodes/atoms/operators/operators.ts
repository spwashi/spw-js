import {getOperatorReference, getOperatorRule} from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';
import {
    ChannelOperator,
    EvaluationOperator,
    InvocationOperator,
    PerformanceOperator,
    PerspectiveOperator,
} from '@constructs/ast';

// references
export const channelAtom     = getOperatorReference(ChannelOperator);
export const evaluationAtom  = getOperatorReference(EvaluationOperator);
export const invocationAtom  = getOperatorReference(InvocationOperator);
export const performanceAtom = getOperatorReference(PerformanceOperator);
export const perspectiveAtom = getOperatorReference(PerspectiveOperator);


// rules
export const channelOperatorRule     = getOperatorRule(ChannelOperator);
export const evaluationOperatorRule  = getOperatorRule(EvaluationOperator);
export const invocationOperatorRule  = getOperatorRule(InvocationOperator);
export const performanceOperatorRule = getOperatorRule(PerformanceOperator);
export const recognitionOperatorRule = getOperatorRule(PerspectiveOperator);