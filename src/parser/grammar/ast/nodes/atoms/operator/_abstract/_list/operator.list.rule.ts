import { operatorRule } from '../operator.rule';
import { aggregationOperatorRule } from '@grammar/ast/nodes/atoms/operator/aggregation/rule';
import { ascentOperatorRule } from '@grammar/ast/nodes/atoms/operator/ascent/rule';
import { branchOperatorRule } from '@grammar/ast/nodes/atoms/operator/branch/rule';
import { channelOperatorRule } from '@grammar/ast/nodes/atoms/operator/channel/rule';
import { descentOperatorRule } from '@grammar/ast/nodes/atoms/operator/descent/rule';
import { directionOperatorRule } from '@grammar/ast/nodes/atoms/operator/direction/rule';
import { evaluationOperatorRule } from '@grammar/ast/nodes/atoms/operator/evaluation/rule';
import { invocationOperatorRule } from '@grammar/ast/nodes/atoms/operator/invocation/rule';
import { performanceOperatorRule } from '@grammar/ast/nodes/atoms/operator/performance/rule';
import { perspectiveOperatorRule } from '@grammar/ast/nodes/atoms/operator/perspective/rule';
import { rangeOperatorRule } from '@grammar/ast/nodes/atoms/operator/range/rule';
import { reductionOperatorRule } from '@grammar/ast/nodes/atoms/operator/reduction/rule';
import { referenceOperatorRule } from '@grammar/ast/nodes/atoms/operator/reference/rule';
import { spreadOperatorRule } from '@grammar/ast/nodes/atoms/operator/spread/rule';
import { transformationOperatorRule } from '@grammar/ast/nodes/atoms/operator/transformation/rule';
import { valueOperatorRule } from '@grammar/ast/nodes/atoms/operator/value/rule';
import { commonDelimitingOperatorRule } from '@grammar/ast/nodes/atoms/operator/delimiters/common/rule';
import { blockDelimitingOperatorRule } from '@grammar/ast/nodes/atoms/operator/delimiters/block/rule';
import { operatorDelimitingOperatorRule } from '@grammar/ast/nodes/atoms/operator/delimiters/operator/rule';

export default [
  operatorRule,
  aggregationOperatorRule,
  ascentOperatorRule,
  branchOperatorRule,
  channelOperatorRule,
  commonDelimitingOperatorRule,
  blockDelimitingOperatorRule,
  operatorDelimitingOperatorRule,
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
