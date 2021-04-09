import {
    AnchorNode,
    ChannelNode,
    ConceptualNode,
    DomainNode,
    EssentialNode,
    EvaluationNode,
    InvocationNode,
    PerformanceNode,
    PerspectiveNode,
    PhraseNode,
    StringNode,
} from './item';
import {StrandExpression} from './item/impl/expressions/impl/strand';

export * from './item';
export const spwNodeConstructors =
                 {
                     anchor:      AnchorNode,
                     channel:     ChannelNode,
                     concept:     ConceptualNode,
                     domain:      DomainNode,
                     evaluation:  EvaluationNode,
                     essence:     EssentialNode,
                     invocation:  InvocationNode,
                     performance: PerformanceNode,
                     perspective: PerspectiveNode,
                     phrase:      PhraseNode,
                     strand:      StrandExpression,
                     string:      StringNode,
                 };
export type SpwNodeConstructors = typeof spwNodeConstructors;
export type SpwNodeKind = keyof SpwNodeConstructors;
export {UnhydratedSpwItem} from './item/impl/nodes/abstract/interfaces/node';