import {
    AggregationOperator,
    AscentOperator,
    BranchOperator,
    ChannelOperator,
    DescentOperator,
    DirectionOperator,
    EvaluationOperator,
    InvocationOperator,
    PerformanceOperator,
    PerspectiveOperator,
    RangeOperator,
    ReductionOperator,
    ReferenceOperator,
    SpreadOperator,
    TransformationOperator,
    ValueOperator,
} from '@constructs/ast';
import { getOperatorReference, getOperatorRule } from './_util/operator.rule.init';

// references
export const aggregationOperator    = getOperatorReference(AggregationOperator);
export const ascentOperator         = getOperatorReference(AscentOperator);
export const branchOperator         = getOperatorReference(BranchOperator);
export const channelOperator        = getOperatorReference(ChannelOperator);
export const descentOperator        = getOperatorReference(DescentOperator);
export const directionOperator      = getOperatorReference(DirectionOperator);
export const evaluationOperator     = getOperatorReference(EvaluationOperator);
export const invocationOperator     = getOperatorReference(InvocationOperator);
export const performanceOperator    = getOperatorReference(PerformanceOperator);
export const perspectiveOperator    = getOperatorReference(PerspectiveOperator);
export const rangeOperator          = getOperatorReference(RangeOperator);
export const reductionOperator      = getOperatorReference(ReductionOperator);
export const referenceOperator      = getOperatorReference(ReferenceOperator);
export const spreadOperator         = getOperatorReference(SpreadOperator);
export const transformationOperator = getOperatorReference(TransformationOperator);
export const valueOperator          = getOperatorReference(ValueOperator);


// rules
export const aggregationOperatorRule    = getOperatorRule(AggregationOperator);
export const ascentOperatorRule         = getOperatorRule(AscentOperator);
export const branchOperatorRule         = getOperatorRule(BranchOperator);
export const channelOperatorRule        = getOperatorRule(ChannelOperator);
export const descentOperatorRule        = getOperatorRule(DescentOperator);
export const directionOperatorRule      = getOperatorRule(DirectionOperator);
export const evaluationOperatorRule     = getOperatorRule(EvaluationOperator);
export const invocationOperatorRule     = getOperatorRule(InvocationOperator);
export const performanceOperatorRule    = getOperatorRule(PerformanceOperator);
export const perspectiveOperatorRule    = getOperatorRule(PerspectiveOperator);
export const rangeOperatorRule          = getOperatorRule(RangeOperator);
export const reductionOperatorRule      = getOperatorRule(ReductionOperator);
export const referenceOperatorRule      = getOperatorRule(ReferenceOperator);
export const spreadOperatorRule         = getOperatorRule(SpreadOperator);
export const transformationOperatorRule = getOperatorRule(TransformationOperator);
export const valueOperatorRule          = getOperatorRule(ValueOperator);