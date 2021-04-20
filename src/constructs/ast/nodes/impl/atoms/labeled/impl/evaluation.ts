import LabeledAtomNode from '../abstract';
import {ISpwItemStatic} from '@constructs/ast/abstract/item';
import {staticImplements} from '@constructs/ast/util/staticImplements';
import {IUnaryTokenStatic} from '../abstract/interfaces/unary';

type Token = '?';
type Kind = 'evaluation';

const token: Token = '?';
const kind: Kind   = 'evaluation';

@staticImplements<ISpwItemStatic<Kind> & IUnaryTokenStatic<Token>>()
export class EvaluationAtom extends LabeledAtomNode<Kind, Token> {
    static readonly kind: Kind   = kind;
    static readonly token: Token = token;
}