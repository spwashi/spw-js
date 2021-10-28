import { InfixExpressionKind } from '@constructs/ast/expressions/_abstract/infixed/__types';
import { PostfixExpressionKind } from '@constructs/ast/expressions/_abstract/postfixed/__types';
import { PrefixExpressionKind } from '@constructs/ast/expressions/_abstract/prefixed/__types';
import { BlockExpressionKind } from '@constructs/ast/expressions/groups/block/__types';
import { CommonExpressionKind } from '@constructs/ast/expressions/groups/common/__types';
import { CommonExpressionTailKind } from '@constructs/ast/expressions/groups/common/_components/__types';
import { PhraseExpressionKind } from '@constructs/ast/expressions/groups/phrase/__types';
import { InfixedAggregationExpressionKind } from '@constructs/ast/expressions/operations/aggregation/_variants/infixed/__types';
import { PostfixedAggregationExpressionKind } from '@constructs/ast/expressions/operations/aggregation/_variants/postfixed/__types';
import { PrefixedAggregationExpressionKind } from '@constructs/ast/expressions/operations/aggregation/_variants/prefixed/__types';
import { InfixedBindingExpressionKind } from '@constructs/ast/expressions/operations/binding/_variants/infixed/__types';
import { PostfixedBindingExpressionKind } from '@constructs/ast/expressions/operations/binding/_variants/postfixed/__types';
import { PrefixedBindingExpressionKind } from '@constructs/ast/expressions/operations/binding/_variants/prefixed/__types';
import { InfixedChannelExpressionKind } from '@constructs/ast/expressions/operations/channel/_variants/infixed/__types';
import { PostfixedChannelExpressionKind } from '@constructs/ast/expressions/operations/channel/_variants/postfixed/__types';
import { PrefixedChannelExpressionKind } from '@constructs/ast/expressions/operations/channel/_variants/prefixed/__types';
import { InfixedEvaluationExpressionKind } from '@constructs/ast/expressions/operations/evaluation/_variants/infixed/__types';
import { PostfixedEvaluationExpressionKind } from '@constructs/ast/expressions/operations/evaluation/_variants/postfixed/__types';
import { PrefixedEvaluationExpressionKind } from '@constructs/ast/expressions/operations/evaluation/_variants/prefixed/__types';
import { InfixedInvocationExpressionKind } from '@constructs/ast/expressions/operations/invocation/_variants/infixed/__types';
import { PostfixedInvocationExpressionKind } from '@constructs/ast/expressions/operations/invocation/_variants/postfixed/__types';
import { PrefixedInvocationExpressionKind } from '@constructs/ast/expressions/operations/invocation/_variants/prefixed/__types';
import { InfixedPerformanceExpressionKind } from '@constructs/ast/expressions/operations/performance/_variants/infixed/__types';
import { PostfixedPerformanceExpressionKind } from '@constructs/ast/expressions/operations/performance/_variants/postfixed/__types';
import { PrefixedPerformanceExpressionKind } from '@constructs/ast/expressions/operations/performance/_variants/prefixed/__types';
import { InfixedPerspectiveExpressionKind } from '@constructs/ast/expressions/operations/perspective/_variants/infixed/__types';
import { PostfixedPerspectiveExpressionKind } from '@constructs/ast/expressions/operations/perspective/_variants/postfixed/__types';
import { PrefixedPerspectiveExpressionKind } from '@constructs/ast/expressions/operations/perspective/_variants/prefixed/__types';
import { InfixedRangeExpressionKind } from '@constructs/ast/expressions/operations/range/_variants/infixed/__types';
import { PostfixedRangeExpressionKind } from '@constructs/ast/expressions/operations/range/_variants/postfixed/__types';
import { PrefixedRangeExpressionKind } from '@constructs/ast/expressions/operations/range/_variants/prefixed/__types';
import { InfixedReductionExpressionKind } from '@constructs/ast/expressions/operations/reduction/_variants/infixed/__types';
import { PostfixedReductionExpressionKind } from '@constructs/ast/expressions/operations/reduction/_variants/postfixed/__types';
import { PrefixedReductionExpressionKind } from '@constructs/ast/expressions/operations/reduction/_variants/prefixed/__types';
import { InfixedTransformationExpressionKind } from '@constructs/ast/expressions/operations/transformation/_variants/infixed/__types';
import { PostfixedTransformationExpressionKind } from '@constructs/ast/expressions/operations/transformation/_variants/postfixed/__types';
import { PrefixedTransformationExpressionKind } from '@constructs/ast/expressions/operations/transformation/_variants/prefixed/__types';
import { BehaviorExpressionKind } from '@constructs/ast/expressions/sequences/behavior/__types';
import { EntityExpressionKind } from '@constructs/ast/expressions/sequences/entity/__types';
import { InstanceExpressionKind } from '@constructs/ast/expressions/sequences/instance/__types';
import { ConceptNodeKind } from '@constructs/ast/nodes/containers/concept/__types';
import { ConceptualIdentityKind } from '@constructs/ast/nodes/containers/concept/_components/identity/__types';
import { ConceptualSchemeKind } from '@constructs/ast/nodes/containers/concept/_components/scheme/__types';
import { DomainNodeKind } from '@constructs/ast/nodes/containers/domain/__types';
import { DomainIdentityKind } from '@constructs/ast/nodes/containers/domain/_components/identity/__types';
import { DomainSchemeKind } from '@constructs/ast/nodes/containers/domain/_components/scheme/__types';
import { EssenceNodeKind } from '@constructs/ast/nodes/containers/essence/__types';
import { EssentialIdentityKind } from '@constructs/ast/nodes/containers/essence/_components/identity/__types';
import { EssentialSchemeKind } from '@constructs/ast/nodes/containers/essence/_components/scheme/__types';
import { LocationNodeKind } from '@constructs/ast/nodes/containers/location/__types';
import { LocationIdentityKind } from '@constructs/ast/nodes/containers/location/_components/identity/__types';
import { LocationSchemeKind } from '@constructs/ast/nodes/containers/location/_components/scheme/__types';
import { DirectionOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/multi-token/direction/__types';
import { RangeOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/multi-token/range/__types';
import { SpreadOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/multi-token/spread/__types';
import { TransformationOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/multi-token/transformation/__types';
import { AggregationOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/aggregation/__types';
import { AscentOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/ascent/__types';
import { BindingOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/binding/__types';
import { BranchOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/branch/__types';
import { ChannelOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/channel/__types';
import { ConvergenceOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/convergence/__types';
import { DescentOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/descent/__types';
import { DivergenceOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/divergence/__types';
import { EvaluationOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/evaluation/__types';
import { InvocationOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/invocation/__types';
import { PerformanceOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/performance/__types';
import { PerspectiveOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/perspective/__types';
import { ReductionOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/reduction/__types';
import { ReferenceOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/reference/__types';
import { RelationOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/relation/__types';
import { ValueOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/value/__types';
import { BlockDelimiterKind } from '@constructs/ast/nodes/operators/semantic/block_delimiter/__types';
import { CommonDelimiterKind } from '@constructs/ast/nodes/operators/semantic/common_delimiter/__types';
import { NodeDelimterKind } from '@constructs/ast/nodes/operators/semantic/node_delimiter/__types';
import { IdentifierNodeKind } from '@constructs/ast/nodes/scalars/identifier/__types';
import { EmbedmentNodeKind } from '@constructs/ast/nodes/scalars/embedment/__types';
import { NumberNodeKind } from '@constructs/ast/nodes/scalars/number/__types';
import { PhraseNodeKind } from '@constructs/ast/nodes/scalars/phrase/__types';
import { StringNodeKind } from '@constructs/ast/nodes/scalars/string/__types';

export type ScalarKind =
  | IdentifierNodeKind
  | PhraseNodeKind
  | NumberNodeKind
  | StringNodeKind
  | EmbedmentNodeKind;

export type ContainerDelimiterKind =
  | DomainSchemeKind
  | DomainIdentityKind
  | EssentialSchemeKind
  | EssentialIdentityKind
  | ConceptualSchemeKind
  | ConceptualIdentityKind
  | LocationSchemeKind
  | LocationIdentityKind;

export type DelimiterKind = NodeDelimterKind | CommonDelimiterKind | BlockDelimiterKind;

export type OperatorKind =
  | AggregationOperatorKind
  | AscentOperatorKind
  | BranchOperatorKind
  | BindingOperatorKind
  | ChannelOperatorKind
  | ConvergenceOperatorKind
  | DescentOperatorKind
  | DivergenceOperatorKind
  | DirectionOperatorKind
  | EvaluationOperatorKind
  | InvocationOperatorKind
  | PerformanceOperatorKind
  | PerspectiveOperatorKind
  | RangeOperatorKind
  | ReductionOperatorKind
  | RelationOperatorKind
  | ReferenceOperatorKind
  | SpreadOperatorKind
  | TransformationOperatorKind
  | ValueOperatorKind;

export type ContainerKind = ConceptNodeKind | DomainNodeKind | EssenceNodeKind | LocationNodeKind;

export type AbstractOperationExpressionKind =
  | PrefixExpressionKind
  | InfixExpressionKind
  | PostfixExpressionKind;

export type SequenceExpressionKind =
  | BehaviorExpressionKind
  | EntityExpressionKind
  | InstanceExpressionKind;

type AggregationExpressionKind =
  | InfixedAggregationExpressionKind
  | PrefixedAggregationExpressionKind
  | PostfixedAggregationExpressionKind;
type BindingExpressionKind =
  | InfixedBindingExpressionKind
  | PrefixedBindingExpressionKind
  | PostfixedBindingExpressionKind;
type ChannelExpressionKind =
  | PrefixedChannelExpressionKind
  | InfixedChannelExpressionKind
  | PostfixedChannelExpressionKind;
type EvaluationExpressionKind =
  | PrefixedEvaluationExpressionKind
  | InfixedEvaluationExpressionKind
  | PostfixedEvaluationExpressionKind;
type InvocationExpressionKind =
  | PrefixedInvocationExpressionKind
  | InfixedInvocationExpressionKind
  | PostfixedInvocationExpressionKind;
type RangeExpressionKind =
  | InfixedRangeExpressionKind
  | PrefixedRangeExpressionKind
  | PostfixedRangeExpressionKind;
type ReductionExpressionKind =
  | InfixedReductionExpressionKind
  | PrefixedReductionExpressionKind
  | PostfixedReductionExpressionKind;
type PerformanceExpressionKind =
  | PrefixedPerformanceExpressionKind
  | InfixedPerformanceExpressionKind
  | PostfixedPerformanceExpressionKind;
type PerspectiveExpressionKind =
  | PrefixedPerspectiveExpressionKind
  | InfixedPerspectiveExpressionKind
  | PostfixedPerspectiveExpressionKind;
type TransformationExpressionKind =
  | InfixedTransformationExpressionKind
  | PrefixedTransformationExpressionKind
  | PostfixedTransformationExpressionKind;

export type ExpressionKind =
  | AbstractOperationExpressionKind
  | SequenceExpressionKind
  | PhraseExpressionKind
  | BlockExpressionKind
  | CommonExpressionKind
  | CommonExpressionTailKind
  | AggregationExpressionKind
  | BindingExpressionKind
  | RangeExpressionKind
  | ReductionExpressionKind
  | TransformationExpressionKind
  | ChannelExpressionKind
  | EvaluationExpressionKind
  | InvocationExpressionKind
  | PerformanceExpressionKind
  | PerspectiveExpressionKind;

export type ConstructKind =
  | 'unknown'
  | ScalarKind
  | OperatorKind
  | ContainerKind
  | ContainerDelimiterKind
  | DelimiterKind
  | ExpressionKind;
