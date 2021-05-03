type PureAtomKind =
    'anchor' |
    'phrase' |
    'number' |
    'string'
    ;

type LabeledAtomKind =
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
    ;

type ContainerNodeKind =
    'concept' |
    'domain' |
    'essence' |
    'parenthetical'
    ;

type ExpressionKind =
    'phrase_expression' |
    'strand_expression' |
    'perspective_expression'
    ;
export type SpwItemKind =
    PureAtomKind |
    LabeledAtomKind |
    ContainerNodeKind |
    'delimiter' |
    ExpressionKind
    ;
