import {SpwNode} from '../../../_abstract/node';
import {ISpwItemStatic} from '../../../../_abstract/item';
import {staticImplements} from '../../../../_util/staticImplements';
import {SpwItemKey} from '@constructs/ast/_abstract/types';

type Kind = 'number';

@staticImplements<ISpwItemStatic<'number'>>()
export class NumberNode extends SpwNode<Kind> {
    static readonly kind = 'number';
    get key(): SpwItemKey { return parseInt((this.hydrated?.value ?? this.raw?.value) + ''); }
    static isNumberNode(o: unknown): o is NumberNode {
        return (o as NumberNode)?.kind === this.kind;
    }
}