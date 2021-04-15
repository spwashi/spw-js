import {SpwNode} from '../../../../abstract/node';
import {SpwItemKind} from '../../../../../types/kind';
import {HydratedSpwItem, RawSpwItem} from '../../../../../abstract/interfaces/internal';
import {SpwItem, SpwItemKey} from '../../../../../abstract/item';

export default abstract class LabeledAtomNode<K extends SpwItemKind,
    T extends string,
    H extends HydratedSpwItem = HydratedSpwItem,
    U extends RawSpwItem = RawSpwItem> extends SpwNode<K, H, U> {
    protected static token: string | undefined = undefined;
    readonly token: T;
    constructor(node: U, h?: H) {
        super(node, h);
        this.token = (<typeof LabeledAtomNode>this.constructor).token as T;
    }
    get key(): SpwItemKey { return ([this.token, ((this.hydrated?.label ?? this.raw?.label) as SpwItem)?.key].filter(Boolean).join('_') || null) as SpwItemKey; }
}