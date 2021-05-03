import {SpwItemKind} from '@constructs/ast/types/kind';
import {
    AggregationOperator,
    AnchorNode,
    AscentOperator,
    BranchOperator,
    ChannelOperator,
    Concept,
    DescentOperator,
    DirectionOperator,
    Domain,
    Essence,
    EvaluationOperator,
    Group,
    InvocationOperator,
    PerformanceOperator,
    PerspectiveExpression,
    PerspectiveOperator,
    PhraseExpression,
    PhraseNode,
    RangeOperator,
    ReductionOperator,
    ReferenceOperator,
    SpreadOperator,
    StrandExpression,
    StringNode,
    TransformationOperator,
    ValueOperator,
} from './ast';
import {ISpwItemStatic, SpwItem} from '@constructs/ast/abstract/item';
import {NumberNode} from '@constructs/ast/nodes/impl/atoms/pure/number';
import {Delimiter} from '@constructs/ast/nodes/impl/delimiters/delimiter';

type SpwItemConstructorObj = { [K in SpwItemKind]: typeof SpwItem & ISpwItemStatic<K> };

export const spwItemConstructors =
                 {
                     // pure atoms
                     anchor: AnchorNode,
                     phrase: PhraseNode,
                     string: StringNode,
                     number: NumberNode,

                     // operators
                     aggregation:    AggregationOperator,
                     ascent:         AscentOperator,
                     branch:         BranchOperator,
                     channel:        ChannelOperator,
                     descent:        DescentOperator,
                     direction:      DirectionOperator,
                     evaluation:     EvaluationOperator,
                     invocation:     InvocationOperator,
                     performance:    PerformanceOperator,
                     perspective:    PerspectiveOperator,
                     range:          RangeOperator,
                     reduction:      ReductionOperator,
                     reference:      ReferenceOperator,
                     spread:         SpreadOperator,
                     transformation: TransformationOperator,
                     value:          ValueOperator,

                     // container nodes
                     delimiter:     Delimiter,
                     essence:       Essence,
                     concept:       Concept,
                     domain:        Domain,
                     parenthetical: Group,

                     // expressions
                     strand_expression:      StrandExpression,
                     phrase_expression:      PhraseExpression,
                     perspective_expression: PerspectiveExpression,
                 } as SpwItemConstructorObj;

export {SpwItemKind} from '@constructs/ast/types/kind';
export type SpwNodeConstructors = typeof spwItemConstructors;