import {SpwNode} from '../../../_abstract/node';
import {ISpwItemStatic, SpwItem} from '../../../../_abstract/item';
import {staticImplements} from '../../../../_util/staticImplements';
import {HydratedSpwItem, RawSpwItem} from '@constructs/ast/_abstract/interfaces/internal';
import {SpwItemJunction, SpwItemKey, SpwShape} from '@constructs/ast/_abstract/types';

type Kind = 'phrase';
type Hydrated = HydratedSpwItem & { body: SpwItem[] };
type Raw = RawSpwItem & { body: RawSpwItem[] };

@staticImplements<ISpwItemStatic<'phrase'>>()
export class PhraseNode extends SpwNode<Kind, SpwItemJunction<SpwShape, Hydrated, Raw>> {
    static readonly kind = 'phrase';

    get key(): SpwItemKey {
        const body = (this.hydrated ?? this.raw)?.body as SpwShape[];
        return body?.map((i: SpwItem | RawSpwItem) => i.key)
                   .filter(Boolean)
                   .join(' ') ?? null;
    }

    static isPhraseNode(o: unknown): o is PhraseNode {
        return (o as PhraseNode)?.kind === this.kind;
    }
}