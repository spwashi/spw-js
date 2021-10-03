import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { InfixedExpression } from '@constructs/ast/expressions/infixed/construct';
import { InfixedAggregationExpression } from '@constructs/ast/expressions/operations/aggregation/_variants/infixed/expression';
import { PrefixedAggregationExpression } from '@constructs/ast/expressions/operations/aggregation/_variants/prefixed/expression';
import { InfixedBindingExpression } from '@constructs/ast/expressions/operations/binding/_variants/infixed/expression';
import { PrefixedBindingExpression } from '@constructs/ast/expressions/operations/binding/_variants/prefixed/expression';
import { InfixedReductionExpression } from '@constructs/ast/expressions/operations/reduction/_variants/infixed/expression';
import { PrefixedReductionExpression } from '@constructs/ast/expressions/operations/reduction/_variants/prefixed/expression';
import { PostfixExpression } from '@constructs/ast/expressions/postfixed/construct';
import { PrefixExpression } from '@constructs/ast/expressions/prefixed/construct';
import { BlockExpression } from '@constructs/ast/expressions/sequence/block/construct';
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
  InfixedRangeExpression,
  InfixedTransformationExpression,
  InstanceExpression,
  LocatedConceptExpression,
  LocatedDomainExpression,
  LocatedEntityExpression,
  LocatedEssenceExpression,
  LocationalIdentityOperator,
  LocationalSchemeOperator,
  PhraseExpression,
  PostfixedTransformationExpression,
  PrefixedRangeExpression,
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
  // scalars
  anchor: AnchorNode,
  number: NumberNode,
  phrase: PhraseNode,
  string: StringNode,
  embedment: EmbedmentNode,

  // standard operators
  // Aggregation
  aggregation_operator: AggregationOperator,
  infixed_aggregation_expression: InfixedAggregationExpression,
  prefixed_aggregation_expression: PrefixedAggregationExpression,

  // Binding
  binding_operator: BindingOperator,
  infixed_binding_expression: InfixedBindingExpression,
  prefixed_binding_expression: PrefixedBindingExpression,

  // Range
  range_operator: RangeOperator,
  infixed_range_expression: InfixedRangeExpression,
  prefixed_range_expression: PrefixedRangeExpression,

  // Reduction
  reduction_operator: ReductionOperator,
  infixed_reduction_expression: InfixedReductionExpression,
  prefixed_reduction_expression: PrefixedReductionExpression,

  // Transformation
  infixed_transformation_expression: InfixedTransformationExpression,
  prefixed_transformation_expression: PrefixedTransformationExpression,
  postfixed_transformation_expression: PostfixedTransformationExpression,

  //
  ascent_operator: AscentOperator,
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
  relation_operator: RelationOperator,
  reference_operator: ReferenceOperator,
  spread_operator: SpreadOperator,
  transformation_operator: TransformationOperator,
  value_operator: ValueOperator,

  // delimiting operators
  node_delimiter: NodeDelimiter,
  block_delimiter: BlockDelimiter,
  common_delimiter: CommonDelimiter,

  // concept
  concept_container: Concept,
  concept_identity: ConceptualIdentityOperator,
  concept_scheme: ConceptSchemeOperator,
  // domain
  domain_container: Domain,
  domain_identity: DomainIdentityOperator,
  domain_scheme: DomainSchemeOperator,
  // essence
  essence_container: Essence,
  essence_identity: EssentialIdentityOperator,
  essence_scheme: EssentialSchemeOperator,
  // location
  location_container: Location,
  location_identity: LocationalIdentityOperator,
  location_scheme: LocationalSchemeOperator,
  located_concept_expression: LocatedConceptExpression,
  located_domain_expression: LocatedDomainExpression,
  located_entity_expression: LocatedEntityExpression,
  located_essence_expression: LocatedEssenceExpression,

  // block
  block: BlockExpression,

  infix_expression: InfixedExpression,
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
