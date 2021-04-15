import {SpwNode} from '../../../abstract/node';
import {ISpwItemStatic, SpwItem, SpwItemKey} from '../../../../abstract/item';
import {staticImplements} from '../../../../util/staticImplements';
import {HydratedSpwItem, RawSpwItem} from '@constructs/ast/abstract/interfaces/internal';

type Kind = 'phrase';

@staticImplements<ISpwItemStatic<Kind>>()
export class PhraseNode extends SpwNode<Kind, HydratedSpwItem & { body: SpwItem[] }, RawSpwItem & { body: RawSpwItem[] }> {
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