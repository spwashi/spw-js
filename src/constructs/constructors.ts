import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { ConstructKind } from '@constructs/ast/_types/kinds';
import { InfixExpression } from '@constructs/ast/expressions/infix/construct';
import { PrefixedAggregationExpression } from '@constructs/ast/expressions/infix/operations/aggregation/_variants/prefixed/expression';
import { AggregationExpression } from '@constructs/ast/expressions/infix/operations/aggregation/expression';
import { PrefixedReductionExpression } from '@constructs/ast/expressions/infix/operations/reduction/_variants/prefixed/expression';
import { ReductionExpression } from '@constructs/ast/expressions/infix/operations/reduction/expression';
import { PostfixExpression } from '@constructs/ast/expressions/postfix/construct';
import { PrefixExpression } from '@constructs/ast/expressions/prefix/construct';
import { Block } from '@constructs/ast/expressions/sequence/block/construct';
import {
  BehaviorExpression,
  CommonExpression,
  CommonExpressionTail,
  ConceptSchemeOperator,
  ConceptualIdentityOperator,
  DomainIdentityOperator,
  DomainSchemeOperator,
  EntityExpression,
  EssentialIdentityOperator,
  EssentialSchemeOperator,
  InstanceExpression,
  LocatedConceptExpression,
  LocatedDomainExpression,
  LocatedEntityExpression,
  LocatedEssenceExpression,
  LocationalIdentityOperator,
  LocationalSchemeOperator,
  PhraseExpression,
  PrefixedStrandExpression,
  StrandExpression,
} from './ast/expressions';
import {
  AggregationOperator,
  AnchorNode,
  AscentOperator,
  BindingOperator,
  BlockDelimitingOperator,
  BranchOperator,
  ChannelOperator,
  CommonDelimitingOperator,
  Concept,
  ConvergenceOperator,
  DescentOperator,
  DirectionOperator,
  DivergenceOperator,
  Domain,
  EmbedmentNode,
  Essence,
  EvaluationOperator,
  InvocationOperator,
  Location,
  NodeDelimitingOperator,
  NumberNode,
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

type ConstructorNameMap = {
  [K in ConstructKind]: typeof Construct & IConstructClass<K>;
};

export const spwItemConstructors = {
  unknown: Construct,
  // scalars
  anchor: AnchorNode,
  number: NumberNode,
  phrase: PhraseNode,
  string: StringNode,
  embedment: EmbedmentNode,
  // standard operators
  aggregation: AggregationOperator,
  aggregation_expression: AggregationExpression,
  prefixed_aggregation_expression: PrefixedAggregationExpression,
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
  reduction_expression: ReductionExpression,
  prefixed_reduction_expression: PrefixedReductionExpression,
  relation: RelationOperator,
  reference: ReferenceOperator,
  spread: SpreadOperator,
  transformation: TransformationOperator,
  value: ValueOperator,
  // delimiting operators
  operator_delimiter: NodeDelimitingOperator,
  block_delimiter: BlockDelimitingOperator,
  common_delimiter: CommonDelimitingOperator,
  // concept
  concept: Concept,
  concept_identity: ConceptualIdentityOperator,
  concept_scheme: ConceptSchemeOperator,
  // domain
  domain: Domain,
  domain_identity: DomainIdentityOperator,
  domain_scheme: DomainSchemeOperator,
  // essence
  essence: Essence,
  essence_identity: EssentialIdentityOperator,
  essence_scheme: EssentialSchemeOperator,
  // location
  location: Location,
  location_identity: LocationalIdentityOperator,
  location_scheme: LocationalSchemeOperator,
  located_concept_expression: LocatedConceptExpression,
  located_domain_expression: LocatedDomainExpression,
  located_entity_expression: LocatedEntityExpression,
  located_essence_expression: LocatedEssenceExpression,
  // block
  block: Block,
  // infix
  infix_expression: InfixExpression,
  strand_expression: StrandExpression,
  prefixed_strand_expression: PrefixedStrandExpression,
  common_expression: CommonExpression,
  common_tail: CommonExpressionTail,
  // prefix
  prefix_expression: PrefixExpression,
  // postfix
  postfix_expression: PostfixExpression,
  // sequences
  entity_expression: EntityExpression,
  phrase_expression: PhraseExpression,
  instance_expression: InstanceExpression,
  behavior_expression: BehaviorExpression,
} as ConstructorNameMap;
