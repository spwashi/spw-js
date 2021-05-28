import LabeledSpwOperator from '../_abstract/operator';
import {ISpwConstructStatic} from '@constructs/ast/_abstract/spwConstruct';
import {staticImplements} from '@constructs/ast/_util/typescript/staticImplements';
import {IAtomicSpwOperatorStatic} from '../_abstract/_types/atomic';

type Token = '!';
type Kind = 'performance';

const token: Token = '!';
const kind: Kind   = 'performance';

@staticImplements<ISpwConstructStatic<'performance'> & IAtomicSpwOperatorStatic<'!'>>()
export class PerformanceOperator extends LabeledSpwOperator<Kind> {
    static readonly kind: Kind   = kind;

    static readonly token: Token = token;
}
