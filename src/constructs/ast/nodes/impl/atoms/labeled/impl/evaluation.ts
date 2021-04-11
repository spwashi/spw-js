import LabeledAtomNode from '../abstract';
import {ISpwItemStatic} from '@constructs/ast/abstract/item';
import {staticImplements} from '@constructs/ast/util/staticImplements';
import {IUnaryTokenStatic} from '../abstract/interfaces/unary';

@staticImplements<ISpwItemStatic & IUnaryTokenStatic>()
export class EvaluationNode extends LabeledAtomNode {
    static readonly kind          = 'evaluation';
    static readonly token: string = '?';
}