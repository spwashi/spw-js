type PureAtomKind =
    'anchor' |
    'phrase' |
    'number' |
    'string'
    ;

type LabeledAtomKind =
    'channel' |
    'evaluation' |
    'invocation' |
    'performance' |
    'perspective'
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
