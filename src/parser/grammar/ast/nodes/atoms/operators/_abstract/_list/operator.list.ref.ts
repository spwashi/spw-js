import { aggregationOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/aggregation/ref';
import { ascentOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/ascent/ref';
import { branchOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/branch/ref';
import { channelOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/channel/ref';
import { descentOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/descent/ref';
import { directionOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/direction/ref';
import { evaluationOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/evaluation/ref';
import { invocationOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/invocation/ref';
import { performanceOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/performance/ref';
import { perspectiveOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/perspective/ref';
import { rangeOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/range/ref';
import { reductionOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/reduction/ref';
import { referenceOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/reference/ref';
import { spreadOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/spread/ref';
import { transformationOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/transformation/ref';
import { valueOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/value/ref';

/**
 * Operators that result in a mutated identity
 */
export const pragmaticOperators = [
  // these begin with a "." and are arranged by length in descending order
  spreadOperator,
  rangeOperator,
  descentOperator,

  // these are composed of multiple characters
  transformationOperator,
  directionOperator,

  // other operators - no assumed precedence
  aggregationOperator,
  ascentOperator,
  branchOperator,
  channelOperator,
  evaluationOperator,
  invocationOperator,
  performanceOperator,
  perspectiveOperator,
  reductionOperator,
  referenceOperator,
  valueOperator,
];
