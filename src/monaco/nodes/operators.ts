// containers
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
import { BindingOperator } from '@constructs/ast/nodes/operators/pragmatic/single-token/binding/construct';
import { BlockDelimiter } from '@constructs/ast/nodes/operators/semantic/block_delimiter/construct';
import { CommonDelimiter } from '@constructs/ast/nodes/operators/semantic/common_delimiter/construct';
import { NodeDelimiter } from '@constructs/ast/nodes/operators/semantic/node_delimiter/construct';
import { build, escape } from 'xregexp';
import { Tokenizer } from '../_types/types';
import { rn_operator } from '../tokens';
import { tokenizerState } from '../util/tokenizerState';

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
  BlockDelimiter,
  CommonDelimiter,
  NodeDelimiter,
];

export const operatorRules: Tokenizer = {
  [rn_operator]: operatorTypes.map((op) => ({ include: tokenizerState(op.kind) })),
  ...Object.fromEntries(
    operatorTypes.map((op) => {
      return [op.kind, [makeOperatorRule(op.token, rn_operator + '.' + op.kind)]];
    }),
  ),
};
