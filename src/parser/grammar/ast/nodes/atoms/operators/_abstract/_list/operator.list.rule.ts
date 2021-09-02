import { operatorRule } from '../operator.rule';
import { aggregationOperatorRule } from '@grammar/ast/nodes/atoms/operators/pragmatic/aggregation/rule';
import { ascentOperatorRule } from '@grammar/ast/nodes/atoms/operators/pragmatic/ascent/rule';
import { branchOperatorRule } from '@grammar/ast/nodes/atoms/operators/pragmatic/branch/rule';
import { channelOperatorRule } from '@grammar/ast/nodes/atoms/operators/pragmatic/channel/rule';
import { descentOperatorRule } from '@grammar/ast/nodes/atoms/operators/pragmatic/descent/rule';
import { directionOperatorRule } from '@grammar/ast/nodes/atoms/operators/pragmatic/direction/rule';
import { evaluationOperatorRule } from '@grammar/ast/nodes/atoms/operators/pragmatic/evaluation/rule';
import { invocationOperatorRule } from '@grammar/ast/nodes/atoms/operators/pragmatic/invocation/rule';
import { performanceOperatorRule } from '@grammar/ast/nodes/atoms/operators/pragmatic/performance/rule';
import { perspectiveOperatorRule } from '@grammar/ast/nodes/atoms/operators/pragmatic/perspective/rule';
import { rangeOperatorRule } from '@grammar/ast/nodes/atoms/operators/pragmatic/range/rule';
import { reductionOperatorRule } from '@grammar/ast/nodes/atoms/operators/pragmatic/reduction/rule';
import { referenceOperatorRule } from '@grammar/ast/nodes/atoms/operators/pragmatic/reference/rule';
import { spreadOperatorRule } from '@grammar/ast/nodes/atoms/operators/pragmatic/spread/rule';
import { transformationOperatorRule } from '@grammar/ast/nodes/atoms/operators/pragmatic/transformation/rule';
import { valueOperatorRule } from '@grammar/ast/nodes/atoms/operators/pragmatic/value/rule';

export const operatorRules = [
  operatorRule,
  aggregationOperatorRule,
  ascentOperatorRule,
  branchOperatorRule,
  channelOperatorRule,
  descentOperatorRule,
  directionOperatorRule,
  evaluationOperatorRule,
  invocationOperatorRule,
  performanceOperatorRule,
  perspectiveOperatorRule,
  rangeOperatorRule,
  reductionOperatorRule,
  referenceOperatorRule,
  spreadOperatorRule,
  transformationOperatorRule,
  valueOperatorRule,
];
