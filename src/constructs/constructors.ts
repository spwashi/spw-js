import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { ConstructContext } from '@constructs/runtime/context/interfaces';
import {
  AggregationOperator,
  AnchorNode,
  AscentOperator,
  BranchOperator,
  ChannelOperator,
  Concept,
  DescentOperator,
  DirectionOperator,
  Domain,
  Essence,
  EvaluationOperator,
  InvocationOperator,
  Lens,
  Location,
  PerformanceOperator,
  PerspectiveExpression,
  PerspectiveOperator,
  PhraseExpression,
  PhraseNode,
  RangeOperator,
  ReductionOperator,
  ReferenceOperator,
  SpreadOperator,
  StrandExpression,
  StrandTail,
  StringNode,
  TransformationOperator,
  ValueOperator,
} from '@constructs/ast';
import { NumberNode } from '@constructs/ast/nodes/atoms/scalars/number/construct';
import { BlockDelimitingOperator } from '@constructs/ast/nodes/atoms/operators/delimiters/block/construct';
import { CommonDelimitingOperator } from '@constructs/ast/nodes/atoms/operators/delimiters/common/construct';
import { ConceptualIdentityOperator } from '@constructs/ast/nodes/containers/concept/components/identity/construct';
import { DomainIdentityOperator } from '@constructs/ast/nodes/containers/domain/components/identity/construct';
import { ConstructKind } from '@constructs/ast/_types/kinds';
import { OperatorDelimitingOperator } from '@constructs/ast/nodes/atoms/operators/delimiters/operator/construct';
import { DomainSchemeOperator } from '@constructs/ast/nodes/containers/domain/components/scheme/construct';
import { ConceptSchemeOperator } from '@constructs/ast/nodes/containers/concept/components/scheme/construct';
import { EssentialSchemeOperator } from '@constructs/ast/nodes/containers/essence/components/scheme/construct';
import { EssentialIdentityOperator } from '@constructs/ast/nodes/containers/essence/components/identity/construct';
import { LocationalSchemeOperator } from '@constructs/ast/nodes/containers/location/components/scheme/construct';
import { LocationalIdentityOperator } from '@constructs/ast/nodes/containers/location/components/identity/construct';

type ConstructorNameMap = {
  [K in ConstructKind]: typeof Construct & IConstructClass<K>;
};
export const spwItemConstructors = {
  unknown: Construct,
  context: ConstructContext,
  // scalars

  anchor: AnchorNode,
  phrase: PhraseNode,
  string: StringNode,
  number: NumberNode,

  // operators

  aggregation: AggregationOperator,
  ascent: AscentOperator,
  branch: BranchOperator,
  channel: ChannelOperator,
  descent: DescentOperator,
  direction: DirectionOperator,
  evaluation: EvaluationOperator,
  invocation: InvocationOperator,
  performance: PerformanceOperator,
  perspective: PerspectiveOperator,
  range: RangeOperator,
  reduction: ReductionOperator,
  reference: ReferenceOperator,
  spread: SpreadOperator,
  transformation: TransformationOperator,
  value: ValueOperator,

  // delimiters

  operator_delimiter: OperatorDelimitingOperator,
  block_delimiter: BlockDelimitingOperator,
  common_delimiter: CommonDelimitingOperator,

  // containers

  concept: Concept,
  concept_identity: ConceptualIdentityOperator,
  concept_scheme: ConceptSchemeOperator,

  domain: Domain,
  domain_identity: DomainIdentityOperator,
  domain_scheme: DomainSchemeOperator,

  essence: Essence,
  essence_scheme: EssentialSchemeOperator,
  essence_identity: EssentialIdentityOperator,

  group: Location,
  group_scheme: LocationalSchemeOperator,
  group_identity: LocationalIdentityOperator,

  strand: StrandExpression,
  strand_tail: StrandTail,

  phrase_expression: PhraseExpression,

  perspective_expression: PerspectiveExpression,
  lens: Lens,
} as ConstructorNameMap;
