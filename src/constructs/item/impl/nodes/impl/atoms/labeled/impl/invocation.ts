import LabeledAtomNode from '../abstract';
import {ISpwItemStatic} from '@constructs/item/abstract/item';
import {staticImplements} from '@constructs/item/util/staticImplements';
import {IUnaryTokenStatic} from '../abstract/interfaces/unary';

@staticImplements<ISpwItemStatic & IUnaryTokenStatic>()
export class InvocationNode extends LabeledAtomNode {
    static readonly kind          = 'invocation';
    static readonly token: string = '~';
}