import {staticImplements} from '@constructs/ast/_util/typescript/staticImplements';
import {ConstructComponents, ISpwConstructStatic} from '@constructs/ast/_abstract/spwConstruct';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import {SpwDelimiter} from '../../atoms/delimiters/_abstract/delimiter';
import {operatorComponents} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

export type OpenEssenceToken = '[';
export type CloseEssenceToken = ']';

@staticImplements<ISpwConstructStatic<'essence_objective'> & IAtomicSpwOperatorStatic<'['>>()
export class EssenceObjectiveDelimiter extends SpwDelimiter<'essence_objective'> {
    static kind: 'essence_objective' = 'essence_objective';

    static token: OpenEssenceToken = '[';

    static components: ConstructComponents = operatorComponents(EssenceObjectiveDelimiter);
}

@staticImplements<ISpwConstructStatic<'essence_subjective'> & IAtomicSpwOperatorStatic<']'>>()
export class EssenceSubjectiveDelimiter extends SpwDelimiter<'essence_subjective'> {
    static kind: 'essence_subjective' = 'essence_subjective';

    static token: CloseEssenceToken = ']';

    static components: ConstructComponents = operatorComponents(EssenceSubjectiveDelimiter);
}