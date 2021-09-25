import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { ConstructKind } from '@constructs/ast/_types/kinds';
import { InfixExpression } from '@constructs/ast/expressions/infix/construct';
import { AggregationExpression } from '@constructs/ast/expressions/infix/operations/aggregation/_variants/infixed/expression';
import { PrefixedAggregationExpression } from '@constructs/ast/expressions/infix/operations/aggregation/_variants/prefixed/expression';
import { InfixedBindingExpression } from '@constructs/ast/expressions/infix/operations/binding/_variants/infixed/expression';
import { PrefixedBindingExpression } from '@constructs/ast/expressions/infix/operations/binding/_variants/prefixed/expression';
import { InfixedReductionExpression } from '@constructs/ast/expressions/infix/operations/reduction/_variants/infixed/expression';
import { PrefixedReductionExpression } from '@constructs/ast/expressions/infix/operations/reduction/_variants/prefixed/expression';
import { PostfixExpression } from '@constructs/ast/expressions/postfix/construct';
import { PrefixExpression } from '@constructs/ast/expressions/prefix/construct';
import { BlockExpression } from '@constructs/ast/expressions/sequence/block/construct';
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
  InfixedRangeExpression,
  InstanceExpression,
  LocatedConceptExpression,
  LocatedDomainExpression,
  LocatedEntityExpression,
  LocatedEssenceExpression,
  LocationalIdentityOperator,
  LocationalSchemeOperator,
  PhraseExpression,
  PrefixedRangeExpression,
  PrefixedTransformationExpression,
  InfixedTransformationExpression,
} from './ast/expressions';
import {
  AggregationOperator,
  AnchorNode,
  AscentOperator,
  BindingOperator,
  BlockDelimiter,
  BranchOperator,
  ChannelOperator,
  CommonDelimiter,
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
  NodeDelimiter,
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
  // Aggregation
  aggregation: AggregationOperator,
  aggregation_expression: AggregationExpression,
  prefixed_aggregation_expression: PrefixedAggregationExpression,

  // Binding
  binding: BindingOperator,
  infixed_binding_expression: InfixedBindingExpression,
  prefixed_binding_expression: PrefixedBindingExpression,

  // Range
  range: RangeOperator,
  infixed_range_expression: InfixedRangeExpression,
  prefixed_range_expression: PrefixedRangeExpression,

  // Reduction
  reduction: ReductionOperator,
  infixed_reduction_expression: InfixedReductionExpression,
  prefixed_reduction_expression: PrefixedReductionExpression,

  // Transformation
  infixed_transformation_expression: InfixedTransformationExpression,
  prefixed_transformation_expression: PrefixedTransformationExpression,

  //
  ascent: AscentOperator,
  branch: BranchOperator,
  channel: ChannelOperator,
  convergence: ConvergenceOperator,
  descent: DescentOperator,
  direction: DirectionOperator,
  divergence: DivergenceOperator,
  evaluation: EvaluationOperator,
  invocation: InvocationOperator,
  performance: PerformanceOperator,
  perspective: PerspectiveOperator,
  relation: RelationOperator,
  reference: ReferenceOperator,
  spread: SpreadOperator,
  transformation: TransformationOperator,
  value: ValueOperator,

  // delimiting operators
  node_delimiter: NodeDelimiter,
  block_delimiter: BlockDelimiter,
  common_delimiter: CommonDelimiter,

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
  block: BlockExpression,

  infix_expression: InfixExpression,
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
