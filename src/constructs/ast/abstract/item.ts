import {HydratedSpwItem, RawSpwItem} from './interfaces/internal';
import {SpwItemKind} from '../types/kind';

export interface ISpwItemStatic<K extends SpwItemKind = SpwItemKind> {
    readonly kind: K;
}

export type SpwItemKey = string | number | null;

export abstract class SpwItem<K extends SpwItemKind = SpwItemKind, H extends HydratedSpwItem = HydratedSpwItem, U extends RawSpwItem = RawSpwItem> {
    readonly kind: K;
    abstract readonly key: SpwItemKey;
    protected readonly _hydrated: H | undefined;
    protected readonly _raw: U | null;
    constructor(node?: U, hydrated?: H) {
        const constructor = <typeof SpwItem>this.constructor as unknown as ISpwItemStatic<K>;
        this.kind         = (node?.kind ?? constructor.kind) as K;
        this._raw        = node || null;
        this._hydrated   = hydrated;
    }
    get raw(): U | null {
        return this._raw;
    }
    get hydrated(): H | undefined {
        return this._hydrated;
    }
}