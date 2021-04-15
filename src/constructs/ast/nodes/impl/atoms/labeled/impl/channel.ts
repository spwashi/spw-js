import LabeledAtomNode from '../abstract';
import {ISpwItemStatic} from '../../../../../abstract/item';
import {staticImplements} from '../../../../../util/staticImplements';
import {IUnaryTokenStatic} from '../abstract/interfaces/unary';

type Token = '#';
type Kind = 'channel';

const token: Token = '#';
const kind: Kind   = 'channel';

@staticImplements<ISpwItemStatic<Kind> & IUnaryTokenStatic<Token>>()
export class ChannelAtom extends LabeledAtomNode<Kind, Token> {
    static readonly kind: Kind   = kind;
    static readonly token: Token = token;
}
