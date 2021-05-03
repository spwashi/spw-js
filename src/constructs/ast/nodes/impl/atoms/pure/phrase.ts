import {SpwNode} from '../../../abstract/node';
import {ISpwItemStatic, SpwItem} from '../../../../abstract/item';
import {staticImplements} from '../../../../util/staticImplements';
import {HydratedSpwItem, RawSpwItem} from '@constructs/ast/abstract/interfaces/internal';
import {SpwItemJunction, SpwItemKey, SpwShape} from '@constructs/ast/abstract/types';

type Kind = 'phrase';
type Hydrated = HydratedSpwItem & { body: SpwItem[] };
type Raw = RawSpwItem & { body: RawSpwItem[] };

@staticImplements<ISpwItemStatic<Kind>>()
export class PhraseNode extends SpwNode<Kind, SpwItemJunction<SpwShape, Hydrated, Raw>> {
    static readonly kind = 'phrase';

    get key(): SpwItemKey {
        return (this.hydrated ?? this.raw)?.body?.map((i: SpwItem | RawSpwItem) => i.key)
                                          .filter(Boolean)
                                          .join(' ') ?? null;
    }

    static isPhraseNode(o: unknown): o is PhraseNode {
        return (o as PhraseNode)?.kind === this.kind;
    }
}