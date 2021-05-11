import {ISpwItemStatic} from '../../../../_abstract/item';
import {staticImplements} from '../../../../_util/staticImplements';
import {SpwNode} from '@constructs/ast/nodes/_abstract/node';
import {SpwItemKey} from '@constructs/ast/_abstract/types';

type Kind = 'anchor';

@staticImplements<ISpwItemStatic<'anchor'>>()
export class AnchorNode extends SpwNode<Kind> {
    static readonly kind = 'anchor';
    get key(): SpwItemKey { return (this.hydrated?.label ?? this.raw?.label ?? null) as SpwItemKey; }
    static isAnchorNode(o: unknown): o is AnchorNode {
        return (o as AnchorNode)?.kind === this.kind;
    }
}