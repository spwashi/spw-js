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
import { Node } from '@constructs/ast/nodes/_abstract/node';
import { LocationalSchemeOperator } from '@constructs/ast/nodes/containers/location/components/scheme/construct';
import { DomainSchemeOperator } from '@constructs/ast/nodes/containers/domain/components/scheme/construct';
import { EssentialSchemeOperator } from '@constructs/ast/nodes/containers/essence/components/scheme/construct';
import { ContainerNode } from '@constructs/ast/nodes/containers/_abstract/container';

export const tok_whitespace = 'whitespace';

export const rn_node = Node.name;
export const rn_anchorNode = 'node_anchor';
export const rn_container = ContainerNode.name;

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
export const rn_domain_open = DomainSchemeOperator.name;
export const rn_domain_body = Domain.name + suffix_body;
export const rn_domain_close = DomainIdentityOperator.name;

export const tok_domain = rn_container + '.' + Domain.name;

// essence

export const rn_essence_open = EssentialSchemeOperator.name;
export const rn_essence_body = EssentialSchemeOperator.name + suffix_body;
export const rn_essence_close = EssentialIdentityOperator.name;

export const tok_essence = rn_container + '.' + Essence.name;

// location

export const rn_location_open = LocationalSchemeOperator.name;
export const rn_location_body = Location.name + suffix_body;
export const rn_location_close = LocationalIdentityOperator.name;

export const tok_location = rn_container + '.' + Location.name;

// concept

export const rn_concept_open = ConceptSchemeOperator.name;
export const rn_concept_body = Concept.name + suffix_body;
export const rn_concept_close = ConceptualIdentityOperator.name;

export const tok_concept = rn_container + '.' + Concept.name;

// operators

export const rn_operator = 'operator';

export const tok_aggregation = rn_operator + '.' + AggregationOperator.name;
export const tok_ascent = rn_operator + '.' + AscentOperator.name;
export const tok_branch = rn_operator + '.' + BranchOperator.name;
export const tok_channel = rn_operator + '.' + ChannelOperator.name;
export const tok_descent = rn_operator + '.' + DescentOperator.name;
export const tok_direction = rn_operator + '.' + DirectionOperator.name;
export const tok_evaluation = rn_operator + '.' + EvaluationOperator.name;
export const tok_invocation = rn_operator + '.' + InvocationOperator.name;
export const tok_performance = rn_operator + '.' + PerformanceOperator.name;
export const tok_perspective = rn_operator + '.' + PerspectiveOperator.name;
export const tok_range = rn_operator + '.' + RangeOperator.name;
export const tok_reduction = rn_operator + '.' + ReductionOperator.name;
export const tok_reference = rn_operator + '.' + ReferenceOperator.name;
export const tok_spread = rn_operator + '.' + SpreadOperator.name;
export const tok_transformation = rn_operator + '.' + TransformationOperator.name;
export const tok_value = rn_operator + '.' + ValueOperator.name;

export const tok_commonDelimiter = rn_operator + '.' + CommonDelimitingOperator.name;
export const tok_blockDelimiter = rn_operator + '.' + BlockDelimitingOperator.name;
export const tok_operatorDelimiter = rn_operator + '.' + OperatorDelimitingOperator.name;
