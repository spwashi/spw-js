import {SpwNode} from '../../../_abstract/node';
import {ISpwItemStatic} from '../../../../_abstract/item';
import {staticImplements} from '../../../../_util/staticImplements';
import {HydratedSpwItem, RawSpwItem} from '@constructs/ast/_abstract/interfaces/internal';
import {SpwItemJunction, SpwItemKey, SpwShape} from '@constructs/ast/_abstract/types';

type Kind = 'string';

type Str = { chars: string, token: '"' | '\'' };

type Hydrated = HydratedSpwItem & Str;
type Raw = RawSpwItem & Str;

@staticImplements<ISpwItemStatic<'string'>>()
export class StringNode extends SpwNode<Kind, SpwItemJunction<SpwShape, Hydrated, Raw>> {
    static readonly kind = 'string';

    get key(): SpwItemKey {
        const chars = this.hydrated?.chars ?? this.raw?.chars ?? '';
        const token = this.hydrated?.token ?? this.raw?.token ?? '"';
        return [token, chars, token].join('');
    }

    static isStringNode(o: unknown): o is StringNode {
        return (o as StringNode)?.kind === this.kind;
    }
}