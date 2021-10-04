import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { InfixedExpression } from '@constructs/ast/expressions/_abstract/infixed/construct';
import { PostfixedExpression } from '@constructs/ast/expressions/_abstract/postfixed/construct';
import { PrefixedExpression } from '@constructs/ast/expressions/_abstract/prefixed/construct';
import { BlockExpression } from '@constructs/ast/expressions/groups/block/construct';
import {
  AbstractOperationExpressionKind,
  ConstructKind,
  ContainerDelimiterKind,
  ContainerKind,
  DelimiterKind,
  ExpressionKind,
  OperatorKind,
  ScalarKind,
  SequenceExpressionKind,
} from '@constructs/top/kinds';
import {
  BehaviorExpression,
  CommonExpression,
  CommonExpressionTail,
  ConceptIdentityOperator,
  ConceptSchemeOperator,
  DomainIdentityOperator,
  DomainSchemeOperator,
  EntityExpression,
  EssenceIdentityOperator,
  EssenceSchemeOperator,
  InfixedAggregationExpression,
  InfixedBindingExpression,
  InfixedChannelExpression,
  InfixedEvaluationExpression,
  InfixedInvocationExpression,
  InfixedPerformanceExpression,
  InfixedPerspectiveExpression,
  InfixedRangeExpression,
  InfixedReductionExpression,
  InfixedTransformationExpression,
  InstanceExpression,
  LocationIdentityOperator,
  LocationSchemeOperator,
  PhraseExpression,
  PostfixedAggregationExpression,
  PostfixedBindingExpression,
  PostfixedChannelExpression,
  PostfixedEvaluationExpression,
  PostfixedInvocationExpression,
  PostfixedPerformanceExpression,
  PostfixedPerspectiveExpression,
  PostfixedRangeExpression,
  PostfixedReductionExpression,
  PostfixedTransformationExpression,
  PrefixedAggregationExpression,
  PrefixedBindingExpression,
  PrefixedChannelExpression,
  PrefixedEvaluationExpression,
  PrefixedInvocationExpression,
  PrefixedPerformanceExpression,
  PrefixedPerspectiveExpression,
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

const delimiterConstructors = {
  node_delimiter: NodeDelimiter,
  block_delimiter: BlockDelimiter,
  common_delimiter: CommonDelimiter,
} as { [K in DelimiterKind]: typeof Construct & IConstructClass<K> };

const operatorConstructors = {
  aggregation_operator: AggregationOperator,
  ascent_operator: AscentOperator,
  binding_operator: BindingOperator,
  branch_operator: BranchOperator,
  channel_operator: ChannelOperator,
  convergence_operator: ConvergenceOperator,
  descent_operator: DescentOperator,
  direction_operator: DirectionOperator,
  divergence_operator: DivergenceOperator,
  evaluation_operator: EvaluationOperator,
  invocation_operator: InvocationOperator,
  performance_operator: PerformanceOperator,
  perspective_operator: PerspectiveOperator,
  range_operator: RangeOperator,
  reduction_operator: ReductionOperator,
  reference_operator: ReferenceOperator,
  relation_operator: RelationOperator,
  spread_operator: SpreadOperator,
  transformation_operator: TransformationOperator,
  value_operator: ValueOperator,
} as { [K in OperatorKind]: typeof Construct & IConstructClass<K> };

const containerDelimiterConstructors = {
  concept_identity: ConceptIdentityOperator,
  concept_scheme: ConceptSchemeOperator,
  domain_identity: DomainIdentityOperator,
  domain_scheme: DomainSchemeOperator,
  essence_identity: EssenceIdentityOperator,
  essence_scheme: EssenceSchemeOperator,
  location_identity: LocationIdentityOperator,
  location_scheme: LocationSchemeOperator,
} as { [K in ContainerDelimiterKind]: typeof Construct & IConstructClass<K> };

const containerConstructors = {
  concept_container: Concept,
  domain_container: Domain,
  essence_container: Essence,
  location_container: Location,
} as { [K in ContainerKind]: typeof Construct & IConstructClass<K> };

const scalarConstructors = {
  anchor: AnchorNode,
  number: NumberNode,
  phrase: PhraseNode,
  string: StringNode,
  embedment: EmbedmentNode,
} as { [K in ScalarKind]: typeof Construct & IConstructClass<K> };

const sequenceExpressionConstructors = {
  entity_expression: EntityExpression,
  instance_expression: InstanceExpression,
  behavior_expression: BehaviorExpression,
} as { [K in SequenceExpressionKind]: typeof Construct & IConstructClass<K> };

const abstractOperationExpressionConstructors = {
  prefixed_expression: PrefixedExpression,
  infixed_expression: InfixedExpression,
  postfixed_expression: PostfixedExpression,
} as { [K in AbstractOperationExpressionKind]: typeof Construct & IConstructClass<K> };

const expressionConstructors = {
  ...abstractOperationExpressionConstructors,
  ...sequenceExpressionConstructors,

  block: BlockExpression,
  common_expression: CommonExpression,
  common_tail: CommonExpressionTail,
  phrase_expression: PhraseExpression,

  //

  infixed_aggregation_expression: InfixedAggregationExpression,
  prefixed_aggregation_expression: PrefixedAggregationExpression,
  postfixed_aggregation_expression: PostfixedAggregationExpression,

  infixed_binding_expression: InfixedBindingExpression,
  prefixed_binding_expression: PrefixedBindingExpression,
  postfixed_binding_expression: PostfixedBindingExpression,

  infixed_range_expression: InfixedRangeExpression,
  prefixed_range_expression: PrefixedRangeExpression,
  postfixed_range_expression: PostfixedRangeExpression,

  infixed_reduction_expression: InfixedReductionExpression,
  prefixed_reduction_expression: PrefixedReductionExpression,
  postfixed_reduction_expression: PostfixedReductionExpression,

  infixed_transformation_expression: InfixedTransformationExpression,
  prefixed_transformation_expression: PrefixedTransformationExpression,
  postfixed_transformation_expression: PostfixedTransformationExpression,

  infixed_channel_expression: InfixedChannelExpression,
  prefixed_channel_expression: PrefixedChannelExpression,
  postfixed_channel_expression: PostfixedChannelExpression,

  infixed_invocation_expression: InfixedInvocationExpression,
  prefixed_invocation_expression: PrefixedInvocationExpression,
  postfixed_invocation_expression: PostfixedInvocationExpression,

  infixed_evaluation_expression: InfixedEvaluationExpression,
  prefixed_evaluation_expression: PrefixedEvaluationExpression,
  postfixed_evaluation_expression: PostfixedEvaluationExpression,

  infixed_perspective_expression: InfixedPerspectiveExpression,
  prefixed_perspective_expression: PrefixedPerspectiveExpression,
  postfixed_perspective_expression: PostfixedPerspectiveExpression,

  infixed_performance_expression: InfixedPerformanceExpression,
  prefixed_performance_expression: PrefixedPerformanceExpression,
  postfixed_performance_expression: PostfixedPerformanceExpression,
} as { [K in ExpressionKind]: typeof Construct & IConstructClass<K> };

export const spwItemConstructors = {
  unknown: Construct,
  ...operatorConstructors,
  ...delimiterConstructors,
  ...scalarConstructors,
  ...containerConstructors,
  ...containerDelimiterConstructors,
  ...expressionConstructors,
} as { [K in ConstructKind]: typeof Construct & IConstructClass<K> };
