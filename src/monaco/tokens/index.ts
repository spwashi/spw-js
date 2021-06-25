import { EssentialIdentityOperator } from '@constructs/ast/nodes/containers/essence/components/identity/construct';
import {
  AggregationOperator,
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
  Location,
  PerformanceOperator,
  PerspectiveOperator,
  RangeOperator,
  ReductionOperator,
  ReferenceOperator,
  SpreadOperator,
  TransformationOperator,
  ValueOperator,
} from '@constructs/ast';
import { ConceptualIdentityOperator } from '@constructs/ast/nodes/containers/concept/components/identity/construct';
import { DomainIdentityOperator } from '@constructs/ast/nodes/containers/domain/components/identity/construct';
import { LocationalIdentityOperator } from '@constructs/ast/nodes/containers/location/components/identity/construct';
import { ConceptSchemeOperator } from '@constructs/ast/nodes/containers/concept/components/scheme/construct';
import { CommonDelimitingOperator } from '@constructs/ast/nodes/atoms/operators/delimiters/common/construct';
import { BlockDelimitingOperator } from '@constructs/ast/nodes/atoms/operators/delimiters/block/construct';
import { OperatorDelimitingOperator } from '@constructs/ast/nodes/atoms/operators/delimiters/operator/construct';
import { LocationalSchemeOperator } from '@constructs/ast/nodes/containers/location/components/scheme/construct';
import { DomainSchemeOperator } from '@constructs/ast/nodes/containers/domain/components/scheme/construct';
import { EssentialSchemeOperator } from '@constructs/ast/nodes/containers/essence/components/scheme/construct';
import { Node } from '@constructs/ast/nodes/_abstract/node';
import { ContainerNode } from '@constructs/ast/nodes/containers/_abstract/container';

export const tok_whitespace = 'whitespace';

export const rn_node = 'node' || Node.kind;
export const rn_anchorNode = 'node_anchor';
export const rn_container = 'container' || ContainerNode.kind;

export const tok_anchorNode = 'anchor';

// string

export const rn_stringNode_open = 'string';
export const rn_stringBody = 'string_body';

export const tok_stringQuote = rn_stringNode_open + '.quote';

/***************
 ** containers
 ***************/
const suffix_body = '__body';

// domain
export const rn_domain_open = DomainSchemeOperator.kind;
export const rn_domain_body = Domain.kind + suffix_body;
export const rn_domain_close = DomainIdentityOperator.kind;

export const tok_domain = rn_container + '.' + Domain.kind;

// essence

export const rn_essence_open = EssentialSchemeOperator.kind;
export const rn_essence_body = EssentialSchemeOperator.kind + suffix_body;
export const rn_essence_close = EssentialIdentityOperator.kind;

export const tok_essence = rn_container + '.' + Essence.kind;

// location

export const rn_location_open = LocationalSchemeOperator.kind;
export const rn_location_body = Location.kind + suffix_body;
export const rn_location_close = LocationalIdentityOperator.kind;

export const tok_location = rn_container + '.' + Location.kind;

// concept

export const rn_concept_open = ConceptSchemeOperator.kind;
export const rn_concept_body = Concept.kind + suffix_body;
export const rn_concept_close = ConceptualIdentityOperator.kind;

export const tok_concept = rn_container + '.' + Concept.kind;

// operators

export const rn_operator = 'operator';

export const tok_aggregation = rn_operator + '.' + AggregationOperator.kind;
export const tok_ascent = rn_operator + '.' + AscentOperator.kind;
export const tok_branch = rn_operator + '.' + BranchOperator.kind;
export const tok_channel = rn_operator + '.' + ChannelOperator.kind;
export const tok_descent = rn_operator + '.' + DescentOperator.kind;
export const tok_direction = rn_operator + '.' + DirectionOperator.kind;
export const tok_evaluation = rn_operator + '.' + EvaluationOperator.kind;
export const tok_invocation = rn_operator + '.' + InvocationOperator.kind;
export const tok_performance = rn_operator + '.' + PerformanceOperator.kind;
export const tok_perspective = rn_operator + '.' + PerspectiveOperator.kind;
export const tok_range = rn_operator + '.' + RangeOperator.kind;
export const tok_reduction = rn_operator + '.' + ReductionOperator.kind;
export const tok_reference = rn_operator + '.' + ReferenceOperator.kind;
export const tok_spread = rn_operator + '.' + SpreadOperator.kind;
export const tok_transformation = rn_operator + '.' + TransformationOperator.kind;
export const tok_value = rn_operator + '.' + ValueOperator.kind;

export const tok_commonDelimiter = rn_operator + '.' + CommonDelimitingOperator.kind;
export const tok_blockDelimiter = rn_operator + '.' + BlockDelimitingOperator.kind;
export const tok_operatorDelimiter = rn_operator + '.' + OperatorDelimitingOperator.kind;
