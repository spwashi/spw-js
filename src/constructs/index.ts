import {SpwItemKind} from '@constructs/ast/types/kind';
import {
    AnchorNode,
    ChannelAtom,
    Concept,
    Domain,
    Essence,
    EvaluationAtom,
    InvocationAtom,
    Group,
    PerformanceAtom,
    PerspectiveAtom,
    PerspectiveExpression,
    PhraseExpression,
    PhraseNode,
    StrandExpression,
    StringNode,
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

                     // labeled nodes
                     channel:     ChannelAtom,
                     evaluation:  EvaluationAtom,
                     invocation:  InvocationAtom,
                     performance: PerformanceAtom,
                     perspective: PerspectiveAtom,

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