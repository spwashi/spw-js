import {SpwItemKind} from '@constructs/ast/_types/kind';
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
import {ISpwItemStatic, SpwItem} from '@constructs/ast/_abstract/item';
import {NumberNode} from '@constructs/ast/nodes/atoms/scalars/number/construct';
import {
    ConceptObjectiveDelimiter,
    ConceptSubjectiveDelimiter,
} from '@constructs/ast/nodes/containers/concept/delimiters';
import {DomainObjectiveDelimiter, DomainSubjectiveDelimiter} from '@constructs/ast/nodes/containers/domain/delimiters';
import {
    EssenceObjectiveDelimiter,
    EssenceSubjectiveDelimiter,
} from '@constructs/ast/nodes/containers/essence/delimiters';
import {GroupObjectiveDelimiter, GroupSubjectiveDelimiter} from '@constructs/ast/nodes/containers/group/delimiters';
import {BlockDelimiter} from '@constructs/ast/nodes/atoms/delimiters/block/delimiter';
import {CommonDelimiter} from '@constructs/ast/nodes/atoms/delimiters/common/delimiter';

type SpwItemConstructorObj = { [K in SpwItemKind]: typeof SpwItem & ISpwItemStatic<K> };

export const spwItemConstructors =
                 {
                     // scalars

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

                     // delimiters

                     block_delimiter:  BlockDelimiter,
                     common_delimiter: CommonDelimiter,

                     // containers

                     concept:            Concept,
                     concept_objective:  ConceptObjectiveDelimiter,
                     concept_subjective: ConceptSubjectiveDelimiter,

                     domain:            Domain,
                     domain_subjective: DomainSubjectiveDelimiter,
                     domain_objective:  DomainObjectiveDelimiter,

                     essence:            Essence,
                     essence_objective:  EssenceObjectiveDelimiter,
                     essence_subjective: EssenceSubjectiveDelimiter,

                     group:            Group,
                     group_objective:  GroupObjectiveDelimiter,
                     group_subjective: GroupSubjectiveDelimiter,

                     strand_expression:      StrandExpression,
                     phrase_expression:      PhraseExpression,
                     perspective_expression: PerspectiveExpression,
                 } as SpwItemConstructorObj;

export {SpwItemKind} from '@constructs/ast/_types/kind';
export type SpwNodeConstructors = typeof spwItemConstructors;