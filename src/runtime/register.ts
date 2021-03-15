import {SpwNode} from '../ast/node/spwNode';
import {SpwNodeIdentifier} from './runtime';

export type RegisterValue = { item: SpwNode; time: number };

type RegisterParameters = { memory?: number | null, index?: (node: SpwNode | any) => any };

function addToLimitedArray(addition: any, prev: Iterable<any>, memory: number | null) {
    let items = [addition, ...prev];
    if (memory !== null) {
        items = items.slice(0, memory)
    }
    return items;
}

export class RuntimeRegister {
    private readonly memory: number | null;
    private readonly _indexer: ((node: SpwNode) => string | string[]) | undefined;
    private _map                         = new Map<string | Symbol, RegisterValue | Array<RegisterValue>>();
    private counter                      = 0;
    private _items: Array<RegisterValue> = [];
    constructor({memory = null, index}: RegisterParameters = {memory: null}) {
        this.memory   = memory;
        this._indexer = index;
    }
    get items() {
        return this._items;
    }

    add(item: SpwNode) {
        const registerValue =
                  {
                      item,
                      time:  Date.now(),
                      count: this.counter++,
                  } as RegisterValue;

        if (this.memory === 1) {
            this._items[0] = registerValue
        } else {
            const prev  = this._items || [];
            this._items = addToLimitedArray(registerValue, prev, this.memory);
        }

        if (!this._indexer) {
            return this;
        }

        const indexer = this._indexer(item);

        if (typeof indexer === 'string' || typeof indexer === 'symbol') {
            this.append(indexer, registerValue)
            return this;
        }

        if (typeof indexer[Symbol.iterator] === 'function') {
            [...indexer].forEach(index => this.append(index, registerValue))
        }

        return this;
    }

    get(index?: number | string): RegisterValue | RegisterValue[] | undefined {
        let item = this.normalizeIndex(index);
        if (this._map.has(item)) {
            return this._map.get(item);
        }
        let items = this.items || [];

        if (typeof index === 'number') {
            return items[index];
        }

        return items
    }

    resolve(index?: number | string): SpwNode | SpwNode[] | undefined {
        const register = this.get(index);
        return Array.isArray(register) ? register.map(r => r.item) : register?.item;
    }

    private normalizeIndex(search: any) {
        if (typeof search === 'string') {
            if (search[0] === '+') return search.substr(1);
        }
        return search;
    }

    private append(raw: string | Symbol, newItem: RegisterValue): void {
        const index = this.normalizeIndex(raw);
        const prev  = (this._map.get(index) || []) as [];
        const arr   = addToLimitedArray(newItem, prev, this.memory);
        this._map.set(index, arr);
        return;
    }
}

export type RegisterMap = Map<SpwNodeIdentifier, RuntimeRegister>;