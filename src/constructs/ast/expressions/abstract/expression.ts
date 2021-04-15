import {SpwItemKind} from '../../types/kind';
import {HydratedSpwItem, RawSpwItem} from '../../abstract/interfaces/internal';
import {SpwItem} from '../../abstract/item';

export abstract class SpwExpression<K extends SpwItemKind,
    H extends HydratedSpwItem = HydratedSpwItem,
    U extends RawSpwItem = RawSpwItem> extends SpwItem<K, H, U> {

}