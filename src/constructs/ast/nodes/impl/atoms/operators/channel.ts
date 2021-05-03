import SpwOperator from './abstract/operator';
import {ISpwItemStatic} from '../../../../abstract/item';
import {staticImplements} from '../../../../util/staticImplements';
import {IAtomicSpwOperatorStatic} from './abstract/types/atomic';

type Token = '#';
type Kind = 'channel';

const token: Token = '#';
const kind: Kind   = 'channel';

@staticImplements<ISpwItemStatic<Kind> & IAtomicSpwOperatorStatic<Token>>()
export class ChannelOperator extends SpwOperator<Kind, Token> {
    static readonly kind: Kind   = kind;
    static readonly token: Token = token;
}
