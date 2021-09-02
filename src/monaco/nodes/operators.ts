// containers
import { build, escape } from 'xregexp';
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
import { Tokenizer } from '../_types/types';
import { rn_operator } from '../tokens';
import { CommonDelimitingOperator } from '@constructs/ast/nodes/operators/semantic/common/construct';
import { BlockDelimitingOperator } from '@constructs/ast/nodes/operators/semantic/block/construct';
import { NodeDelimitingOperator } from '@constructs/ast/nodes/operators/semantic/node/construct';
import { tokenizerState } from '../util/tokenizerState';
import { BindingOperator } from '@constructs/ast/nodes/operators/pragmatic/single-token/binding/construct';

function makeOperatorRule(token: string, tokenName: string, behavior?: { action: string }) {
  const regExp = build(
    // language=JSRegexp
    '{{token}}{{label}}',
    {
      // language=JSRegexp
      token: escape(token),
      // language=JSRegexp
      label: '(_[a-zA-Z_\\d-]*)?',
    },
  );
  return [regExp, { token: tokenName, ...(behavior ?? {}) }];
}

const operatorTypes = [
  AggregationOperator,
  AscentOperator,
  BranchOperator,
  BindingOperator,
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
  BlockDelimitingOperator,
  CommonDelimitingOperator,
  NodeDelimitingOperator,
];

export const operatorRules: Tokenizer = {
  [rn_operator]: operatorTypes.map((op) => ({ include: tokenizerState(op.kind) })),
  ...Object.fromEntries(
    operatorTypes.map((op) => {
      return [op.kind, [makeOperatorRule(op.token, rn_operator + '.' + op.kind)]];
    }),
  ),
};
