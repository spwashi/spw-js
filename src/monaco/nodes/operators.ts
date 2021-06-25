// containers
import XRegExp from 'xregexp';
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
import { CommonDelimitingOperator } from '@constructs/ast/nodes/atoms/operators/delimiters/common/construct';
import { BlockDelimitingOperator } from '@constructs/ast/nodes/atoms/operators/delimiters/block/construct';
import { OperatorDelimitingOperator } from '@constructs/ast/nodes/atoms/operators/delimiters/operator/construct';
import { tokenizerState } from '../util/tokenizerState';

function makeOperatorRule(token: string, tokenName: string, behavior?: { action: string }) {
  const regExp = XRegExp.build(
    // language=JSRegexp
    '{{token}}{{label}}',
    {
      // language=JSRegexp
      token: XRegExp.escape(token),
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
  OperatorDelimitingOperator,
];

export const operatorRules: Tokenizer = {
  [rn_operator]: operatorTypes.map((op) => ({ include: tokenizerState(op.kind) })),
  ...Object.fromEntries(
    operatorTypes.map((op) => {
      return [op.kind, [makeOperatorRule(op.token, rn_operator + '.' + op.kind)]];
    }),
  ),
};
