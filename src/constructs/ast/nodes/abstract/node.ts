import {SpwItemKind} from '@constructs/ast/types/kind';
import {HydratedSpwItem, RawSpwItem} from '@constructs/ast/abstract/interfaces/internal';
import {SpwItem, SpwItemKey} from '@constructs/ast/abstract/item';

export class SpwNode<K extends SpwItemKind,
    H extends HydratedSpwItem = HydratedSpwItem,
    U extends RawSpwItem = RawSpwItem> extends SpwItem<K, H, U> {
    get key(): SpwItemKey {
        const error = new Error('Nothing for ' + JSON.stringify(this.raw));
        return this.kind;
        throw error;
    }
}