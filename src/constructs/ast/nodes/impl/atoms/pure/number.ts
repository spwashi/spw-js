import {SpwNode} from '../../../abstract/node';
import {ISpwItemStatic} from '../../../../abstract/item';
import {staticImplements} from '../../../../util/staticImplements';
import {SpwItemKey} from '@constructs/ast/abstract/types';

type Kind = 'number';

@staticImplements<ISpwItemStatic<Kind>>()
export class NumberNode extends SpwNode<Kind> {
    static readonly kind = 'number';
    get key(): SpwItemKey { return parseInt((this.hydrated?.value ?? this.raw?.value) + ''); }
    static isNumberNode(o: unknown): o is NumberNode {
        return (o as NumberNode)?.kind === this.kind;
    }
}