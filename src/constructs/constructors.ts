import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { ConstructContext } from '@constructs/runtime/context/interfaces';
import { NumberNode } from '@constructs/ast/nodes/scalars/number/construct';
import { BlockDelimitingOperator } from '@constructs/ast/nodes/operators/semantic/block/construct';
import { CommonDelimitingOperator } from '@constructs/ast/nodes/operators/semantic/common/construct';
import { ConceptualIdentityOperator } from '@constructs/ast/nodes/containers/concept/_components/identity/construct';
import { DomainIdentityOperator } from '@constructs/ast/nodes/containers/domain/_components/identity/construct';
import { ConstructKind } from '@constructs/ast/_types/kinds';
import { NodeDelimitingOperator } from '@constructs/ast/nodes/operators/semantic/node/construct';
import { DomainSchemeOperator } from '@constructs/ast/nodes/containers/domain/_components/scheme/construct';
import { ConceptSchemeOperator } from '@constructs/ast/nodes/containers/concept/_components/scheme/construct';
import { EssentialSchemeOperator } from '@constructs/ast/nodes/containers/essence/_components/scheme/construct';
import { EssentialIdentityOperator } from '@constructs/ast/nodes/containers/essence/_components/identity/construct';
import { LocationalSchemeOperator } from '@constructs/ast/nodes/containers/location/_components/scheme/construct';
import { LocationalIdentityOperator } from '@constructs/ast/nodes/containers/location/_components/identity/construct';
import { PrefixExpression } from '@constructs/ast/expressions/prefix/construct';
import { InfixExpression } from '@constructs/ast/expressions/infix/construct';
import { BehaviorExpression } from '@constructs/ast/expressions/sequence/behavior/construct';
import { PostfixExpression } from '@constructs/ast/expressions/postfix/construct';
import { BindingOperator } from '@constructs/ast/nodes/operators/pragmatic/single-token/binding/construct';
import {
  AggregationOperator,
  AnchorNode,
  AscentOperator,
  BranchOperator,
  ChannelOperator,
  Concept,
  ConvergenceOperator,
  DescentOperator,
  DirectionOperator,
  DivergenceOperator,
  Domain,
  Essence,
  EvaluationOperator,
  InvocationOperator,
  Location,
  PerformanceOperator,
  PerspectiveOperator,
  PhraseNode,
  RangeOperator,
  ReductionOperator,
  ReferenceOperator,
  RelationOperator,
  SpreadOperator,
  StringNode,
  TransformationOperator,
  ValueOperator,
} from './ast/nodes';
import { PhraseExpression, StrandExpression, StrandTail } from './ast/expressions';
import { LocatedEssenceExpression } from '@constructs/ast/expressions/sequence/located_essence/construct';
import { LocatedDomainExpression } from '@constructs/ast/expressions/sequence/located_domain/construct';
import { LocatedConceptExpression } from '@constructs/ast/expressions/sequence/located_concept/construct';
import { LocatedEntityExpression } from '@constructs/ast/expressions/sequence/located_entity/construct';
import { EntityExpression } from '@constructs/ast/expressions/sequence/entity/construct';

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
  binding: BindingOperator,
  channel: ChannelOperator,
  convergence: ConvergenceOperator,
  descent: DescentOperator,
  direction: DirectionOperator,
  divergence: DivergenceOperator,
  evaluation: EvaluationOperator,
  invocation: InvocationOperator,
  performance: PerformanceOperator,
  perspective: PerspectiveOperator,
  range: RangeOperator,
  reduction: ReductionOperator,
  relation: RelationOperator,
  reference: ReferenceOperator,
  spread: SpreadOperator,
  transformation: TransformationOperator,
  value: ValueOperator,

  // delimiters

  operator_delimiter: NodeDelimitingOperator,
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

  location: Location,
  location_scheme: LocationalSchemeOperator,
  location_identity: LocationalIdentityOperator,
  located_essence_expression: LocatedEssenceExpression,
  located_domain_expression: LocatedDomainExpression,
  located_concept_expression: LocatedConceptExpression,
  located_entity_expression: LocatedEntityExpression,

  strand: StrandExpression,
  strand_tail: StrandTail,

  prefix_expression: PrefixExpression,
  infix_expression: InfixExpression,
  postfix_expression: PostfixExpression,

  entity_expression: EntityExpression,
  behavior_expression: BehaviorExpression,
  phrase_expression: PhraseExpression,
} as ConstructorNameMap;
