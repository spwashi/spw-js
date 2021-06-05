type ScalarKind =
    'anchor'
    | 'phrase'
    | 'number'
    | 'string'

type DelimitingOperatorKind =
    'common_delimiter'
    | 'block_delimiter'

    | 'domain_objective'
    | 'domain_subjective'
    | 'essence_objective'
    | 'essence_subjective'
    | 'concept_objective'
    | 'concept_subjective'
    | 'group_objective'
    | 'group_subjective'

type OperatorKind =
    'channel'
    | 'evaluation'
    | 'invocation'
    | 'performance'
    | 'perspective'
    | 'reference'
    | 'aggregation'
    | 'reduction'
    | 'transformation'
    | 'direction'
    | 'branch'
    | 'value'
    | 'spread'
    | 'range'
    | 'descent'
    | 'ascent'
    | DelimitingOperatorKind

type ContainerNodeKind =
    'concept'
    | 'domain'
    | 'essence'
    | 'group'

type ExpressionKind =
    'phrase_expression'
    | 'strand'
    | 'strand_tail'
    | 'perspective_expression'
    | 'lens'

type ContextKind =
    'context'

export type ConstructKind =
    'unknown'
    | ContextKind
    | ScalarKind
    | OperatorKind
    | ContainerNodeKind
    | ExpressionKind
