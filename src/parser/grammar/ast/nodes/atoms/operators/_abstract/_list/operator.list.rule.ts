import {labeledAtomNodeRule} from '../operator.rule';
import {
    channelOperatorRule,
    evaluationOperatorRule,
    invocationOperatorRule,
    performanceOperatorRule,
    recognitionOperatorRule,
} from '@grammar/ast/nodes/atoms/operators/operators';

export default [
    labeledAtomNodeRule,
    channelOperatorRule,
    evaluationOperatorRule,
    invocationOperatorRule,
    performanceOperatorRule,
    recognitionOperatorRule,
]