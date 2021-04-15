import LabeledAtomNode from '../labeled/abstract';
import {ISpwItemStatic, SpwItemKey} from '../../../../abstract/item';
import {staticImplements} from '../../../../util/staticImplements';
import {IUnaryTokenStatic} from '../labeled/abstract/interfaces/unary';
import {HydratedSpwItem, RawSpwItem} from '@constructs/ast/abstract/interfaces/internal';

type Kind = 'anchor';
type Token = '&';

@staticImplements<ISpwItemStatic<Kind> & IUnaryTokenStatic<Token>>()
export class AnchorNode extends LabeledAtomNode<Kind, Token, HydratedSpwItem, RawSpwItem> {
    static readonly kind  = 'anchor';
    static readonly token = '&';
    get key(): SpwItemKey { return (this.hydrated?.label ?? this.raw?.label ?? null) as SpwItemKey; }
    static isAnchorNode(o: unknown): o is AnchorNode {
        return (o as AnchorNode)?.kind === this.kind;
    }
}