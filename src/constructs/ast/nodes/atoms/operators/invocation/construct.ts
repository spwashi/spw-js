import SpwOperator from '../_abstract/operator';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {IAtomicSpwOperatorStatic} from '../_abstract/_types/atomic';

type Token = '~';
type Kind = 'invocation';

const token: Token = '~';
const kind: Kind   = 'invocation';

@staticImplements<ISpwItemStatic<'invocation'> & IAtomicSpwOperatorStatic<'~'>>()
export class InvocationOperator extends SpwOperator<Kind, Token> {
    static readonly kind: Kind   = kind;
    static readonly token: Token = token;
}
