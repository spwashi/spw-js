import LabeledSpwOperator from '../_abstract/operator';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {IAtomicSpwOperatorStatic} from '../_abstract/_types/atomic';

type Token = '!';
type Kind = 'performance';

const token: Token = '!';
const kind: Kind   = 'performance';

@staticImplements<ISpwItemStatic<'performance'> & IAtomicSpwOperatorStatic<'!'>>()
export class PerformanceOperator extends LabeledSpwOperator<Kind> {
    static readonly kind: Kind   = kind;

    static readonly token: Token = token;
}