import {SpwNodeLocation} from '../util/location';
import {UnhydratedSpwItem} from '../impl/nodes/abstract/interfaces/node';

export type ISpwItemStatic = {
    readonly kind: string;
}

export type SpwItemKey = string | null;

export abstract class SpwItem implements ISpwItemStatic {
    static kind = 'undefined';
    readonly key: SpwItemKey;
    readonly #_location: SpwNodeLocation;
    readonly #_raw: UnhydratedSpwItem;

    constructor(node: UnhydratedSpwItem) {
        const {key, location} = node;
        this.key        = key ?? null;
        this.#_raw      = node;
        this.#_location = location;
    }

    get kind(): string {
        return (<typeof SpwItem>this.constructor).kind
    }

    get raw(): UnhydratedSpwItem {
        return this.#_raw;
    }
}