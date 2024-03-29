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
import { Node } from '@constructs/ast/nodes/_abstract/node';
import { ContainerNode } from '@constructs/ast/nodes/containers/_abstract/container';
import { ConceptIdentityOperator } from '@constructs/ast/nodes/containers/concept/_components/identity/construct';
import { ConceptSchemeOperator } from '@constructs/ast/nodes/containers/concept/_components/scheme/construct';
import { DomainIdentityOperator } from '@constructs/ast/nodes/containers/domain/_components/identity/construct';
import { DomainSchemeOperator } from '@constructs/ast/nodes/containers/domain/_components/scheme/construct';
import { EssenceIdentityOperator } from '@constructs/ast/nodes/containers/essence/_components/identity/construct';
import { EssenceSchemeOperator } from '@constructs/ast/nodes/containers/essence/_components/scheme/construct';
import { LocationIdentityOperator } from '@constructs/ast/nodes/containers/location/_components/identity/construct';
import { LocationSchemeOperator } from '@constructs/ast/nodes/containers/location/_components/scheme/construct';
import { BlockDelimiter } from '@constructs/ast/nodes/operators/semantic/block_delimiter/construct';
import { CommonDelimiter } from '@constructs/ast/nodes/operators/semantic/common_delimiter/construct';
import { NodeDelimiter } from '@constructs/ast/nodes/operators/semantic/node_delimiter/construct';

export const tok_whitespace = 'whitespace';

export const rn_node = 'node' || Node.kind;
export const rn_identifierNode = 'node_identifier';
export const rn_container = 'container' || ContainerNode.kind;

export const tok_identifierNode = 'identifier';

// string

export const rn_stringNode_open = 'string';
export const rn_stringBody = 'string_body';

export const tok_stringQuote = rn_stringNode_open + '.quote';

// embedment

export const rn_embedmentNode_open = 'embedment';
export const rn_embedmentBody = 'embedment_body';

export const tok_embedmentQuote = rn_embedmentNode_open + '.quote';

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

export const rn_essence_open = EssenceSchemeOperator.kind;
export const rn_essence_body = EssenceSchemeOperator.kind + suffix_body;
export const rn_essence_close = EssenceIdentityOperator.kind;

export const tok_essence = rn_container + '.' + Essence.kind;

// location

export const rn_location_open = LocationSchemeOperator.kind;
export const rn_location_body = Location.kind + suffix_body;
export const rn_location_close = LocationIdentityOperator.kind;

export const tok_location = rn_container + '.' + Location.kind;

// concept

export const rn_concept_open = ConceptSchemeOperator.kind;
export const rn_concept_body = Concept.kind + suffix_body;
export const rn_concept_close = ConceptIdentityOperator.kind;

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

export const tok_commonDelimiter = rn_operator + '.' + CommonDelimiter.kind;
export const tok_blockDelimiter = rn_operator + '.' + BlockDelimiter.kind;
export const tok_operatorDelimiter = rn_operator + '.' + NodeDelimiter.kind;
