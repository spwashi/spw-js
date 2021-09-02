import { AscentOperator } from './ascent/construct';
import { BindingOperator } from './binding/construct';
import { BranchOperator } from './branch/construct';
import { ChannelOperator } from './channel/construct';
import { ConvergenceOperator } from './convergence/construct';
import { DescentOperator } from './descent/construct';
import { DirectionOperator } from '../multi-token/direction/construct';
import { DivergenceOperator } from './divergence/construct';
import { EvaluationOperator } from './evaluation/construct';
import { InvocationOperator } from './invocation/construct';
import { PerformanceOperator } from './performance/construct';
import { PerspectiveOperator } from './perspective/construct';
import { ReferenceOperator } from './reference/construct';
import { ValueOperator } from './value/construct';
import { Operator } from '@constructs/ast/nodes/operators/_abstract/operator';
import { AggregationOperator, ReductionOperator } from '@constructs/ast';

export const singleTokenOperators = [
  AscentOperator,
  AggregationOperator,
  BindingOperator,
  BranchOperator,
  ChannelOperator,
  ConvergenceOperator,
  DescentOperator,
  DirectionOperator,
  DivergenceOperator,
  EvaluationOperator,
  InvocationOperator,
  PerformanceOperator,
  PerspectiveOperator,
  ReductionOperator,
  ReferenceOperator,
  ValueOperator,
] as typeof Operator[];
