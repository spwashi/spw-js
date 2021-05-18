import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ConstructComponents, ISpwConstructStatic} from '@constructs/ast/_abstract/construct';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import {SpwDelimiter} from '../../atoms/delimiters/_abstract/delimiter';
import {operatorComponents} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

export type OpenDomainToken = '{';
export type CloseDomainToken = '}';

@staticImplements<ISpwConstructStatic<'domain_objective'> & IAtomicSpwOperatorStatic<'{'>>()
export class DomainObjectiveDelimiter extends SpwDelimiter<'domain_objective'> {
    static kind: 'domain_objective' = 'domain_objective';

    static token: OpenDomainToken = '{';

    static components: ConstructComponents = operatorComponents(DomainObjectiveDelimiter);
}

@staticImplements<ISpwConstructStatic<'domain_subjective'> & IAtomicSpwOperatorStatic<'}'>>()
export class DomainSubjectiveDelimiter extends SpwDelimiter<'domain_subjective'> {
    static kind: 'domain_subjective' = 'domain_subjective';

    static token: CloseDomainToken = '}';

    static components: ConstructComponents = operatorComponents(DomainSubjectiveDelimiter);
}