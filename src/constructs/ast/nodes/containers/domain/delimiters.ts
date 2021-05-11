import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import {SpwDelimiter} from '../../atoms/delimiters/_abstract/delimiter';

export type OpenDomainToken = '{';
export type CloseDomainToken = '}';

@staticImplements<ISpwItemStatic<'domain_objective'> & IAtomicSpwOperatorStatic<'{'>>()
export class DomainObjectiveDelimiter extends SpwDelimiter<'domain_objective'> {
    static kind: 'domain_objective' = 'domain_objective';
    static token: OpenDomainToken   = '{';
}

@staticImplements<ISpwItemStatic<'domain_subjective'> & IAtomicSpwOperatorStatic<'}'>>()
export class DomainSubjectiveDelimiter extends SpwDelimiter<'domain_subjective'> {
    static kind: 'domain_subjective' = 'domain_subjective';
    static token: CloseDomainToken   = '}';
}