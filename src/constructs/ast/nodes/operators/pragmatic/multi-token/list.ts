import { Operator } from '../../_abstract/operator';
import { DirectionOperator } from './direction/construct';
import { RangeOperator } from './range/construct';
import { SpreadOperator } from './spread/construct';
import { TransformationOperator } from './transformation/construct';

export const multiTokenOperators = [
  SpreadOperator,
  RangeOperator,
  DirectionOperator,
  TransformationOperator,
] as typeof Operator[];
