import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import {SpwDelimiter} from '@constructs/ast/nodes/atoms/delimiters/_abstract/delimiter';

export type OpenGroupToken = '(';
export type CloseGroupToken = ')';

@staticImplements<ISpwItemStatic<'group_objective'> & IAtomicSpwOperatorStatic<'('>>()
export class GroupObjectiveDelimiter extends SpwDelimiter<'group_objective'> {
    static kind: 'group_objective' = 'group_objective';
    static token: OpenGroupToken   = '(';
}

@staticImplements<ISpwItemStatic<'group_subjective'> & IAtomicSpwOperatorStatic<')'>>()
export class GroupSubjectiveDelimiter extends SpwDelimiter<'group_subjective'> {
    static kind: 'group_subjective' = 'group_subjective';
    static token: CloseGroupToken   = ')';
}