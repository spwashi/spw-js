import SpwOperator from '../_abstract/operator';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {IAtomicSpwOperatorStatic} from '../_abstract/_types/atomic';

type Token = '@';
type Kind = 'perspective';

const token: Token = '@';
const kind: Kind   = 'perspective';

@staticImplements<ISpwItemStatic<'perspective'> & IAtomicSpwOperatorStatic<'@'>>()
export class PerspectiveOperator extends SpwOperator<Kind, Token> {
    static readonly kind: Kind   = kind;
    static readonly token: Token = token;
}
