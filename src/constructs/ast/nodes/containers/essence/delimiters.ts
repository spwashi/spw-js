import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import {SpwDelimiter} from '../../atoms/delimiters/_abstract/delimiter';

export type OpenEssenceToken = '[';
export type CloseEssenceToken = ']';

@staticImplements<ISpwItemStatic<'essence_objective'> & IAtomicSpwOperatorStatic<'['>>()
export class EssenceObjectiveDelimiter extends SpwDelimiter<'essence_objective'> {
    static kind: 'essence_objective' = 'essence_objective';
    static token: OpenEssenceToken   = '[';
}

@staticImplements<ISpwItemStatic<'essence_subjective'> & IAtomicSpwOperatorStatic<']'>>()
export class EssenceSubjectiveDelimiter extends SpwDelimiter<'essence_subjective'> {
    static kind: 'essence_subjective' = 'essence_subjective';
    static token: CloseEssenceToken   = ']';
}