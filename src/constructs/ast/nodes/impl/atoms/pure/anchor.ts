import LabeledAtomNode from '../labeled/abstract';
import {ISpwItemStatic} from '../../../../abstract/item';
import {staticImplements} from '../../../../util/staticImplements';
import {IUnaryTokenStatic} from '../labeled/abstract/interfaces/unary';

@staticImplements<ISpwItemStatic & IUnaryTokenStatic>()
export class AnchorNode extends LabeledAtomNode {
    static readonly kind  = 'anchor';
    static readonly token = '&';
}