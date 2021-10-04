import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { InfixedExpression } from '@constructs/ast/expressions/_abstract/infixed/construct';
import { PostfixedExpression } from '@constructs/ast/expressions/_abstract/postfixed/construct';
import { PrefixedExpression } from '@constructs/ast/expressions/_abstract/prefixed/construct';
import { BlockExpression } from '@constructs/ast/expressions/groups/block/construct';
import { ConstructKind } from '@constructs/top/kinds';
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
  InfixedAggregationExpression,
  InfixedBindingExpression,
  InfixedRangeExpression,
  InfixedReductionExpression,
  InfixedTransformationExpression,
  InstanceExpression,
  LocationalIdentityOperator,
  LocationalSchemeOperator,
  PhraseExpression,
  PostfixedAggregationExpression,
  PostfixedBindingExpression,
  PostfixedRangeExpression,
  PostfixedReductionExpression,
  PostfixedTransformationExpression,
  PrefixedAggregationExpression,
  PrefixedBindingExpression,
  PrefixedRangeExpression,
  PrefixedReductionExpression,
  PrefixedTransformationExpression,
} from '../ast/expressions';
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
} from '../ast/nodes';

type ConstructorNameMap = {
  [K in ConstructKind]: typeof Construct & IConstructClass<K>;
};

export const spwItemConstructors = {
  unknown: Construct,

  // Scalars
  anchor: AnchorNode,
  number: NumberNode,
  phrase: PhraseNode,
  string: StringNode,
  embedment: EmbedmentNode,

  // Sequence Expressions
  entity_expression: EntityExpression,
  instance_expression: InstanceExpression,
  behavior_expression: BehaviorExpression,

  // Aggregation
  aggregation_operator: AggregationOperator,
  infixed_aggregation_expression: InfixedAggregationExpression,
  prefixed_aggregation_expression: PrefixedAggregationExpression,
  postfixed_aggregation_expression: PostfixedAggregationExpression,

  // Binding
  binding_operator: BindingOperator,
  infixed_binding_expression: InfixedBindingExpression,
  prefixed_binding_expression: PrefixedBindingExpression,
  postfixed_binding_expression: PostfixedBindingExpression,

  // Range
  range_operator: RangeOperator,
  infixed_range_expression: InfixedRangeExpression,
  prefixed_range_expression: PrefixedRangeExpression,
  postfixed_range_expression: PostfixedRangeExpression,

  // Reduction
  reduction_operator: ReductionOperator,
  infixed_reduction_expression: InfixedReductionExpression,
  prefixed_reduction_expression: PrefixedReductionExpression,
  postfixed_reduction_expression: PostfixedReductionExpression,

  // Transformation
  transformation_operator: TransformationOperator,
  infixed_transformation_expression: InfixedTransformationExpression,
  prefixed_transformation_expression: PrefixedTransformationExpression,
  postfixed_transformation_expression: PostfixedTransformationExpression,

  // todo
  channel_operator: ChannelOperator,
  evaluation_operator: EvaluationOperator,
  invocation_operator: InvocationOperator,
  performance_operator: PerformanceOperator,
  perspective_operator: PerspectiveOperator,

  // todo
  ascent_operator: AscentOperator,
  branch_operator: BranchOperator,
  descent_operator: DescentOperator,
  direction_operator: DirectionOperator,
  relation_operator: RelationOperator,
  reference_operator: ReferenceOperator,
  spread_operator: SpreadOperator,
  value_operator: ValueOperator,

  // delimiting operators
  node_delimiter: NodeDelimiter,
  block_delimiter: BlockDelimiter,
  common_delimiter: CommonDelimiter,

  // Concept Container
  convergence_operator: ConvergenceOperator,
  divergence_operator: DivergenceOperator,
  concept_container: Concept,
  concept_identity: ConceptualIdentityOperator,
  concept_scheme: ConceptSchemeOperator,

  // Domain Container
  domain_container: Domain,
  domain_identity: DomainIdentityOperator,
  domain_scheme: DomainSchemeOperator,

  // EssenceContainer
  essence_container: Essence,
  essence_identity: EssentialIdentityOperator,
  essence_scheme: EssentialSchemeOperator,

  // Location Container
  location_container: Location,
  location_identity: LocationalIdentityOperator,
  location_scheme: LocationalSchemeOperator,

  // block
  block: BlockExpression,
  common_expression: CommonExpression,
  common_tail: CommonExpressionTail,
  phrase_expression: PhraseExpression,

  prefixed_expression: PrefixedExpression,
  infixed_expression: InfixedExpression,
  postfixed_expression: PostfixedExpression,
} as ConstructorNameMap;
