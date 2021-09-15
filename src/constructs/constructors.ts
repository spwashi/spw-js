import { ConstructKind } from '@constructs/ast/_types/kinds';
import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { Block } from '@constructs/ast/expressions/sequence/block/construct';
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
  StrandExpression,
  StrandExpressionTail,
} from './ast/expressions';
import { InfixExpression } from '@constructs/ast/expressions/infix/construct';
import { PrefixExpression } from '@constructs/ast/expressions/prefix/construct';
import { PostfixExpression } from '@constructs/ast/expressions/postfix/construct';
import { AggregationExpression } from '@constructs/ast/expressions/infix/operations/aggregation/expression';
import { AggregationExpressionTail } from '@constructs/ast/expressions/infix/operations/aggregation/_components/tail';

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
  // standard operators
  aggregation: AggregationOperator,
  aggregation_expression: AggregationExpression,
  aggregation_expression_tail: AggregationExpressionTail,
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
  strand_expression_tail: StrandExpressionTail,
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
