import { ConceptualIdentityOperatorKind } from '@constructs/ast/nodes/containers/concept/components/identity/__types';
import { ConceptualSchemeOperatorKind } from '@constructs/ast/nodes/containers/concept/components/scheme/__types';
import { DomainSchemeOperatorKind } from '@constructs/ast/nodes/containers/domain/components/scheme/__types';
import { DomainIdentityOperatorKind } from '@constructs/ast/nodes/containers/domain/components/identity/__types';
import { EssentialSchemeKind } from '@constructs/ast/nodes/containers/essence/components/scheme/__types';
import { EssentialIdentityKind } from '@constructs/ast/nodes/containers/essence/components/identity/__types';
import { OperatorDelimitingOperatorKind } from '@constructs/ast/nodes/atoms/operators/delimiters/operator/__types';
import { CommonDelimitingOperatorKind } from '@constructs/ast/nodes/atoms/operators/delimiters/common/__types';
import { BlockDelimitingOperatorKind } from '@constructs/ast/nodes/atoms/operators/delimiters/block/__types';
import { LocationSchemeOperatorKind } from '@constructs/ast/nodes/containers/location/components/scheme/__types';
import { LocationIdentityOperatorKind } from '@constructs/ast/nodes/containers/location/components/identity/__types';
import { ChannelOperatorKind } from '@constructs/ast/nodes/atoms/operators/channel/__types';
import { EvaluationOperatorKind } from '@constructs/ast/nodes/atoms/operators/evaluation/__types';
import { InvocationOperatorKind } from '@constructs/ast/nodes/atoms/operators/invocation/__types';
import { PerformanceOperatorKind } from '@constructs/ast/nodes/atoms/operators/performance/__types';
import { PerspectiveOperatorKind } from '@constructs/ast/nodes/atoms/operators/perspective/__types';
import { ReferenceOperatorKind } from '@constructs/ast/nodes/atoms/operators/reference/__types';
import { AggregationOperatorKind } from '@constructs/ast/nodes/atoms/operators/aggregation/__types';
import { ReductionOperatorKind } from '@constructs/ast/nodes/atoms/operators/reduction/__types';
import { TransformationOperatorKind } from '@constructs/ast/nodes/atoms/operators/transformation/__types';
import { DirectionOperatorKind } from '@constructs/ast/nodes/atoms/operators/direction/__types';
import { BranchOperatorKind } from '@constructs/ast/nodes/atoms/operators/branch/__types';
import { ValueOperatorKind } from '@constructs/ast/nodes/atoms/operators/value/__types';
import { SpreadOperatorKind } from '@constructs/ast/nodes/atoms/operators/spread/__types';
import { RangeOperatorKind } from '@constructs/ast/nodes/atoms/operators/range/__types';
import { DescentOperatorKind } from '@constructs/ast/nodes/atoms/operators/descent/__types';
import { AscentOperatorKind } from '@constructs/ast/nodes/atoms/operators/ascent/__types';
import { AnchorNodeKind } from '@constructs/ast/nodes/atoms/scalars/anchor/__types';
import { PhraseNodeKind } from '@constructs/ast/nodes/atoms/scalars/phrase/__types';
import { NumberNodeKind } from '@constructs/ast/nodes/atoms/scalars/number/__types';
import { StringNodeKind } from '@constructs/ast/nodes/atoms/scalars/string/__types';
import { ConceptNodeKind } from '@constructs/ast/nodes/containers/concept/__types';
import { DomainNodeKind } from '@constructs/ast/nodes/containers/domain/__types';
import { EssenceNodeKind } from '@constructs/ast/nodes/containers/essence/__types';
import { LocationNodeKind } from '@constructs/ast/nodes/containers/location/__types';
import { PhraseExpressionKind } from '@constructs/ast/expressions/relational/phrase/__types';
import { StrandExpressionKind } from '@constructs/ast/expressions/relational/strand/__types';
import { PerspectiveExpressionKind } from '@constructs/ast/expressions/operational/perspective/__types';
import { StrandTailKind } from '@constructs/ast/expressions/relational/strand/components/__types';
import { LensKind } from '@constructs/ast/expressions/operational/perspective/components/__types';
import { ConstructContextKind } from '@constructs/runtime/context/interfaces/__types';

type ScalarKind =
  | AnchorNodeKind
  | PhraseNodeKind
  | NumberNodeKind
  | StringNodeKind;

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
  | ChannelOperatorKind
  | DelimitingOperatorKind
  | DescentOperatorKind
  | DirectionOperatorKind
  | EvaluationOperatorKind
  | InvocationOperatorKind
  | PerformanceOperatorKind
  | PerspectiveOperatorKind
  | RangeOperatorKind
  | ReductionOperatorKind
  | ReferenceOperatorKind
  | SpreadOperatorKind
  | TransformationOperatorKind
  | ValueOperatorKind;

type ContainerNodeKind =
  | ConceptNodeKind
  | DomainNodeKind
  | EssenceNodeKind
  | LocationNodeKind;

type ExpressionKind =
  | PhraseExpressionKind
  | StrandExpressionKind
  | StrandTailKind
  | PerspectiveExpressionKind
  | LensKind;

export type ConstructKind =
  | 'unknown'
  | ConstructContextKind
  | ScalarKind
  | OperatorKind
  | ContainerNodeKind
  | DelimitingOperatorKind
  | ExpressionKind;
