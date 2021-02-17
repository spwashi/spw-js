import {SpwNode} from '../ast/node/spwNode';
import {SpwNodeIdentifier} from './runtime';

type RegisterValue = { item: SpwNode; time: number };

type RegisterParameters = { memory?: number | null, index?: (node: SpwNode | any) => any };

function addToLimitedArray(addition: any, prev: Iterable<any>, memory: number | null) {
    let newItems = [addition, ...prev];
    if (memory !== null) {
        newItems = newItems.slice(0, memory)
    }
    return newItems;
}

export class RuntimeRegister {
    private readonly memory: number | null;
    private readonly _indexer: ((node: SpwNode) => string | string[]) | undefined;
    private indexes = new Map<string | Symbol, RegisterValue | Array<RegisterValue>>();
    private counter = 0;

    constructor({memory = null, index}: RegisterParameters = {memory: null}) {
        this.memory   = memory;
        this._indexer = index;
    }

    private _items?: Set<RegisterValue> | Array<RegisterValue> = [];

    get items() {
        return this._items;
    }

    add(item: SpwNode) {
        const addition = {
            item,
            time:  Date.now(),
            count: this.counter++,
        };
        const memory   = this.memory;
        if (memory === 1) {
            (this._items as Array<RegisterValue>)[0] = addition
        } else {
            const prev   = this._items || [];
            let newItems = addToLimitedArray(addition, prev, memory);
            // @ts-ignore
            this._items  = new Set<RegisterValue>(newItems)
        }

        if (!this._indexer) return this;

        const indices = this._indexer(item);

        if (typeof indices === 'string' || typeof indices === 'symbol') {
            this.setIndex(indices, addition)
        } else if (typeof indices[Symbol.iterator] === 'function') {
            [...indices].forEach(index => this.setIndex(index, addition))
        }

        return this;
    }

    one() {
        return [...this._items || []][0]
    }

    get(search: any, compare: ((i: any) => boolean) | null = null) {
        let item = this.normalizeIndex(search);

        if (this.indexes.has(item)) {
            return this.indexes.get(item);
        }
        if (compare === null) return null;

        return [...this.items || []].find(compare)
    }

    private normalizeIndex(search: any) {
        if (typeof search === 'string') {
            if (search[0] === '+') return search.substr(1);
        }
        return search;
    }

    private setIndex(raw: string | Symbol, newItem: RegisterValue): void {
        const index = this.normalizeIndex(raw);

        if (!this.isRegisterMultiple(raw)) {
            this.indexes.set(index, newItem);
            return;
        }

        const prev = (this.indexes.get(index) || []) as [];
        const arr  = addToLimitedArray(newItem, prev, this.memory);
        this.indexes.set(index, arr);
        return;
    }

    private isRegisterMultiple(raw: string | Symbol) {
        return typeof raw === 'string' && raw[0] === '+';
    }
}

export type RegisterMap = Map<SpwNodeIdentifier, RuntimeRegister>;