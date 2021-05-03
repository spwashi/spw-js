import {ISpwItemStatic} from '../../../../abstract/item';
import {staticImplements} from '../../../../util/staticImplements';
import {SpwNode} from '@constructs/ast/nodes/abstract/node';
import {SpwItemKey} from '@constructs/ast/abstract/types';

type Kind = 'anchor';

@staticImplements<ISpwItemStatic<Kind>>()
export class AnchorNode extends SpwNode<Kind> {
    static readonly kind = 'anchor';
    get key(): SpwItemKey { return (this.hydrated?.label ?? this.raw?.label ?? null) as SpwItemKey; }
    static isAnchorNode(o: unknown): o is AnchorNode {
        return (o as AnchorNode)?.kind === this.kind;
    }
}