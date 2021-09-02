import { ConceptualIdentityOperatorKind } from '@constructs/ast/nodes/containers/concept/_components/identity/__types';
import { ConceptualSchemeOperatorKind } from '@constructs/ast/nodes/containers/concept/_components/scheme/__types';
import { DomainSchemeOperatorKind } from '@constructs/ast/nodes/containers/domain/_components/scheme/__types';
import { DomainIdentityOperatorKind } from '@constructs/ast/nodes/containers/domain/_components/identity/__types';
import { EssentialSchemeKind } from '@constructs/ast/nodes/containers/essence/_components/scheme/__types';
import { EssentialIdentityKind } from '@constructs/ast/nodes/containers/essence/_components/identity/__types';
import { OperatorDelimitingOperatorKind } from '@constructs/ast/nodes/operators/semantic/node/__types';
import { CommonDelimitingOperatorKind } from '@constructs/ast/nodes/operators/semantic/common/__types';
import { BlockDelimitingOperatorKind } from '@constructs/ast/nodes/operators/semantic/block/__types';
import { LocationSchemeOperatorKind } from '@constructs/ast/nodes/containers/location/_components/scheme/__types';
import { LocationIdentityOperatorKind } from '@constructs/ast/nodes/containers/location/_components/identity/__types';
import { ChannelOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/channel/__types';
import { EvaluationOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/evaluation/__types';
import { InvocationOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/invocation/__types';
import { PerformanceOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/performance/__types';
import { PerspectiveOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/perspective/__types';
import { ReferenceOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/reference/__types';
import { AggregationOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/aggregation/__types';
import { ReductionOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/reduction/__types';
import { TransformationOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/multi-token/transformation/__types';
import { DirectionOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/multi-token/direction/__types';
import { BranchOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/branch/__types';
import { ValueOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/value/__types';
import { SpreadOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/multi-token/spread/__types';
import { RangeOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/multi-token/range/__types';
import { DescentOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/descent/__types';
import { AscentOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/ascent/__types';
import { AnchorNodeKind } from '@constructs/ast/nodes/scalars/anchor/__types';
import { PhraseNodeKind } from '@constructs/ast/nodes/scalars/phrase/__types';
import { NumberNodeKind } from '@constructs/ast/nodes/scalars/number/__types';
import { StringNodeKind } from '@constructs/ast/nodes/scalars/string/__types';
import { ConceptNodeKind } from '@constructs/ast/nodes/containers/concept/__types';
import { DomainNodeKind } from '@constructs/ast/nodes/containers/domain/__types';
import { EssenceNodeKind } from '@constructs/ast/nodes/containers/essence/__types';
import { LocationNodeKind } from '@constructs/ast/nodes/containers/location/__types';
import { PhraseExpressionKind } from '@constructs/ast/expressions/infix/phrase/__types';
import { StrandExpressionKind } from '@constructs/ast/expressions/infix/strand/__types';
import { StrandTailKind } from '@constructs/ast/expressions/infix/strand/_components/__types';
import { ConstructContextKind } from '@constructs/runtime/context/interfaces/__types';
import { PrefixExpressionKind } from '@constructs/ast/expressions/prefix/__types';
import { InfixExpressionKind } from '@constructs/ast/expressions/infix/__types';
import { BehaviorExpressionKind } from '@constructs/ast/expressions/sequence/behavior/__types';
import { PostfixExpressionKind } from '@constructs/ast/expressions/postfix/__types';
import { BindingOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/binding/__types';
import { DivergenceOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/divergence/__types';
import { ConvergenceOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/convergence/__types';
import { LocatedEssenceExpressionKind } from '@constructs/ast/expressions/sequence/located_essence/__types';
import { LocatedDomainExpressionKind } from '@constructs/ast/expressions/sequence/located_domain/__types';
import { LocatedConceptExpressionKind } from '@constructs/ast/expressions/sequence/located_concept/__types';
import { EntityExpressionKind } from '@constructs/ast/expressions/sequence/entity/__types';
import { LocatedEntityExpressionKind } from '@constructs/ast/expressions/sequence/located_entity/__types';
import { RelationOperatorKind } from '@constructs/ast/nodes/operators/pragmatic/single-token/relation/__types';

type ScalarKind = AnchorNodeKind | PhraseNodeKind | NumberNodeKind | StringNodeKind;

type DelimitingOperatorKind =
  | OperatorDelimitingOperatorKind
  | CommonDelimitingOperatorKind
  | BlockDelimitingOperatorKind
  | DomainSchemeOperatorKind
  | DomainIdentityOperatorKind
  | EssentialSchemeKind
  | EssentialIdentityKind
  | ConceptualSchemeOperatorKind
  | ConceptualIdentityOperatorKind
  | LocationSchemeOperatorKind
  | LocationIdentityOperatorKind;

type OperatorKind =
  | AggregationOperatorKind
  | AscentOperatorKind
  | BranchOperatorKind
  | BindingOperatorKind
  | ChannelOperatorKind
  | ConvergenceOperatorKind
  | DelimitingOperatorKind
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

type ContainerNodeKind = ConceptNodeKind | DomainNodeKind | EssenceNodeKind | LocationNodeKind;

type ExpressionKind =
  | PrefixExpressionKind
  | InfixExpressionKind
  | PostfixExpressionKind
  | BehaviorExpressionKind
  | EntityExpressionKind
  | LocatedEssenceExpressionKind
  | LocatedDomainExpressionKind
  | LocatedConceptExpressionKind
  | LocatedEntityExpressionKind
  | PhraseExpressionKind
  | StrandExpressionKind
  | StrandTailKind;

export type ConstructKind =
  | 'unknown'
  | ConstructContextKind
  | ScalarKind
  | OperatorKind
  | ContainerNodeKind
  | DelimitingOperatorKind
  | ExpressionKind;
