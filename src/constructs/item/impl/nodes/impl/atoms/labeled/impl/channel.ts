import LabeledAtomNode from '../abstract';
import {ISpwItemStatic} from '@constructs/item/abstract/item';
import {staticImplements} from '@constructs/item/util/staticImplements';
import {IUnaryTokenStatic} from '../abstract/interfaces/unary';

@staticImplements<ISpwItemStatic & IUnaryTokenStatic>()
export class ChannelNode extends LabeledAtomNode {
    static readonly kind          = 'channel';
    static readonly token: string = '#';
}
