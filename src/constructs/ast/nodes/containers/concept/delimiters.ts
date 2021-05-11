import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import { SpwDelimiter } from '../../atoms/delimiters/_abstract/delimiter';

export type OpenConceptToken = '<';
export type CloseConceptToken = '>';

@staticImplements<ISpwItemStatic<'concept_objective'> & IAtomicSpwOperatorStatic<'<'>>()
export class ConceptObjectiveDelimiter extends SpwDelimiter<'concept_objective'> {
    static kind: 'concept_objective' = 'concept_objective';
    static token: OpenConceptToken   = '<';
}

@staticImplements<ISpwItemStatic<'concept_subjective'> & IAtomicSpwOperatorStatic<'>'>>()
export class ConceptSubjectiveDelimiter extends SpwDelimiter<'concept_subjective'> {
    static kind: 'concept_subjective' = 'concept_subjective';
    static token: CloseConceptToken   = '>';
}