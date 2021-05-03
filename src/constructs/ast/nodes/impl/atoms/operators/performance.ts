import LabeledSpwOperator from './abstract/operator';
import {ISpwItemStatic} from '@constructs/ast/abstract/item';
import {staticImplements} from '@constructs/ast/util/staticImplements';
import {IAtomicSpwOperatorStatic} from './abstract/types/atomic';

type Token = '!';
type Kind = 'performance';

const token: Token = '!';
const kind: Kind   = 'performance';

@staticImplements<ISpwItemStatic<Kind> & IAtomicSpwOperatorStatic<Token>>()
export class PerformanceOperator extends LabeledSpwOperator<Kind, Token> {
    static readonly kind: Kind   = kind;
    static readonly token: Token = token;
}
