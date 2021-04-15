import {SpwNode} from '../../../abstract/node';
import {ISpwItemStatic, SpwItemKey} from '../../../../abstract/item';
import {staticImplements} from '../../../../util/staticImplements';

type Kind = 'number';

@staticImplements<ISpwItemStatic<Kind>>()
export class NumberNode extends SpwNode<Kind> {
    static readonly kind = 'number';

    get key(): SpwItemKey {
        return parseInt((this.hydrated?.value ?? this.raw?.value) + '');
    }

    static isNumberNode(o: unknown): o is NumberNode {
        return (o as NumberNode)?.kind === this.kind;
    }
}