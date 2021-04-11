import {
    AnchorNode,
    ChannelNode,
    PhraseExpression,
    ConceptNode,
    DomainNode,
    EssentialNode,
    EvaluationNode,
    GroupNode,
    InvocationNode,
    PerformanceNode,
    PerspectiveNode,
    PhraseNode,
    StrandExpression,
    StringNode,
} from './ast';

export const spwItemConstructors =
                 {
                     // pure atoms
                     anchor: AnchorNode,
                     phrase: PhraseNode,
                     string: StringNode,

                     // labeled nodes
                     evaluation:  EvaluationNode,
                     essence:     EssentialNode,
                     invocation:  InvocationNode,
                     performance: PerformanceNode,
                     perspective: PerspectiveNode,

                     // container nodes
                     channel: ChannelNode,
                     concept: ConceptNode,
                     domain:  DomainNode,
                     group:   GroupNode,

                     // expressions
                     strand:            StrandExpression,
                     phrase_expression: PhraseExpression,
                 };
export type SpwNodeConstructors = typeof spwItemConstructors;
export type SpwNodeKind = keyof SpwNodeConstructors;
export {UnhydratedSpwItem} from './ast/nodes/abstract/interfaces/node';