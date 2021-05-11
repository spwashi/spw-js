import SpwOperator from '../_abstract/operator';
import {ISpwItemStatic} from '../../../../_abstract/item';
import {staticImplements} from '../../../../_util/staticImplements';
import {IAtomicSpwOperatorStatic} from '../_abstract/_types/atomic';

type Token = '#';
type Kind = 'channel';

const token: Token = '#';
const kind: Kind   = 'channel';

@staticImplements<ISpwItemStatic<'channel'> & IAtomicSpwOperatorStatic<'#'>>()
export class ChannelOperator extends SpwOperator<Kind, Token> {
    static readonly kind: Kind   = kind;
    static readonly token: Token = token;
}
