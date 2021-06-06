import { aggregationOperator } from '@grammar/ast/nodes/atoms/operator/aggregation/ref';
import { ascentOperator } from '@grammar/ast/nodes/atoms/operator/ascent/ref';
import { branchOperator } from '@grammar/ast/nodes/atoms/operator/branch/ref';
import { channelOperator } from '@grammar/ast/nodes/atoms/operator/channel/ref';
import { descentOperator } from '@grammar/ast/nodes/atoms/operator/descent/ref';
import { directionOperator } from '@grammar/ast/nodes/atoms/operator/direction/ref';
import { evaluationOperator } from '@grammar/ast/nodes/atoms/operator/evaluation/ref';
import { invocationOperator } from '@grammar/ast/nodes/atoms/operator/invocation/ref';
import { performanceOperator } from '@grammar/ast/nodes/atoms/operator/performance/ref';
import { perspectiveOperator } from '@grammar/ast/nodes/atoms/operator/perspective/ref';
import { rangeOperator } from '@grammar/ast/nodes/atoms/operator/range/ref';
import { reductionOperator } from '@grammar/ast/nodes/atoms/operator/reduction/ref';
import { referenceOperator } from '@grammar/ast/nodes/atoms/operator/reference/ref';
import { spreadOperator } from '@grammar/ast/nodes/atoms/operator/spread/ref';
import { transformationOperator } from '@grammar/ast/nodes/atoms/operator/transformation/ref';
import { valueOperator } from '@grammar/ast/nodes/atoms/operator/value/ref';

export const operators = [
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
