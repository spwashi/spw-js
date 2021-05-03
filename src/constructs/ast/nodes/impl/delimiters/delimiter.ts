import {ISpwItemStatic, SpwItem} from '@constructs/ast/abstract/item';
import {staticImplements} from '@constructs/ast/util/staticImplements';
import {SpwItemKey} from '@constructs/ast/abstract/types';

@staticImplements<ISpwItemStatic<'delimiter'>>()
export class Delimiter extends SpwItem {
    static readonly kind = 'delimiter';
    get key(): SpwItemKey {
        const label = this.hydrated?.label as {
            anchor: SpwItem,
            description: SpwItem
        };
        return [
            this.hydrated?.token ?? this.raw?.token,
            [
                label?.anchor?.key,
                label?.description,
            ]
                .filter(Boolean)
                .join(''),
        ].filter(Boolean)
         .join('_')
    }
}