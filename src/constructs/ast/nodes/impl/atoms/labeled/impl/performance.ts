import LabeledAtomNode from '../abstract';
import {ISpwItemStatic} from '@constructs/ast/abstract/item';
import {staticImplements} from '@constructs/ast/util/staticImplements';
import {IUnaryTokenStatic} from '../abstract/interfaces/unary';

@staticImplements<ISpwItemStatic & IUnaryTokenStatic>()
export class PerformanceNode extends LabeledAtomNode {
    static readonly kind          = 'performance';
    static readonly token: string = '!';
}