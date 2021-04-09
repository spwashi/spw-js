import LabeledAtomNode from '../abstract';
import {ISpwItemStatic} from '@constructs/item/abstract/item';
import {staticImplements} from '@constructs/item/util/staticImplements';
import {IUnaryTokenStatic} from '../abstract/interfaces/unary';

@staticImplements<ISpwItemStatic & IUnaryTokenStatic>()
export class PerformanceNode extends LabeledAtomNode {
    static readonly kind          = 'performance';
    static readonly token: string = '!';
}