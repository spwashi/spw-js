import {staticImplements} from '@constructs/ast/_util/typescript/staticImplements';
import {ISpwConstructStatic, ConstructComponents} from '@constructs/ast/_abstract/spwConstruct';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import {SpwDelimiter} from '../../atoms/operators/delimiters/_abstract/delimiter';
import {operatorComponents} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

export type OpenConceptToken = '<';
export type CloseConceptToken = '>';

@staticImplements<ISpwConstructStatic<'concept_objective'> & IAtomicSpwOperatorStatic<'<'>>()
export class ConceptObjectiveDelimiter extends SpwDelimiter<'concept_objective'> {
    static kind: 'concept_objective' = 'concept_objective';

    static token: OpenConceptToken = '<';

    static components: ConstructComponents = operatorComponents(ConceptObjectiveDelimiter);
}

@staticImplements<ISpwConstructStatic<'concept_subjective'> & IAtomicSpwOperatorStatic<'>'>>()
export class ConceptSubjectiveDelimiter extends SpwDelimiter<'concept_subjective'> {
    static kind: 'concept_subjective' = 'concept_subjective';

    static token: CloseConceptToken = '>';

    static components: ConstructComponents = operatorComponents(ConceptSubjectiveDelimiter);
}