import {SpwNode} from '../item/impl/nodes/abstract/node';
import {SpwItem} from '../item';

export type RegisterEntry = { item: SpwItem; time: number };

type RegisterParameters = { memory?: number | null, index?: (node: SpwItem | any) => any };

function unshift(addition: any, prev: Iterable<any>, memory: number | null) {
    let items = [addition, ...prev];
    if (memory !== null) {
        items = items.slice(0, memory)
    }
    return items;
}

export class RuntimeRegister {
    private readonly memory: number | null;
    private readonly _indexer: ((node: SpwItem) => string | string[]) | undefined;
    private counter                        = 0;
    private _entries: Array<RegisterEntry> = [];

    constructor({memory = null, index}: RegisterParameters = {memory: null}) {
        this.memory   = memory;
        this._indexer = index;
    }

    get entries() {
        return this._entries;
    }
    get flat() {
        return this._entries.map(({item}) => item)
    }

    add(item: SpwNode) {
        const registerValue =
                  {
                      item,
                      time: Date.now(),
                      key:  this.counter++,
                  } as RegisterEntry;

        if (this.memory === 1) {
            this._entries[0] = registerValue
        } else {
            const prev    = this._entries || [];
            this._entries = unshift(registerValue, prev, this.memory);
        }

        return this;
    }
}

