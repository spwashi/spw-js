import {SpwNode} from '../../../abstract/node';
import {ISpwItemStatic, SpwItemKey} from '../../../../abstract/item';
import {staticImplements} from '../../../../util/staticImplements';
import {HydratedSpwItem, RawSpwItem} from '@constructs/ast/abstract/interfaces/internal';

type Kind = 'string';

type Str = { chars: string, token: '"' | '\'' };

@staticImplements<ISpwItemStatic<Kind>>()
export class StringNode extends SpwNode<Kind, HydratedSpwItem & Str, RawSpwItem & Str> {
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