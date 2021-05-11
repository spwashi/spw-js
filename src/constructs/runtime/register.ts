import {SpwNode} from '../ast/nodes/_abstract/node';
import {SpwItemKind} from '../ast/_types/kind';
import {SpwItem} from '../ast/_abstract/item';

export type RegisterEntry = { item: SpwItem; time: number };

type RegisterParameters = { memory?: number | null };

function unshift<U>(addition: U, prev: Iterable<U>, memory: number | null) {
    let items = [addition, ...prev];
    if (memory !== null) {
        items = items.slice(0, memory)
    }
    return items;
}

export class RuntimeRegister {
    private readonly memory: number | null;
    private counter                        = 0;
    private _entries: Array<RegisterEntry> = [];

    constructor({memory = null}: RegisterParameters = {memory: null}) {
        this.memory = memory;
    }

    get entries(): RegisterEntry[] {
        return this._entries;
    }
    get flat(): SpwItem[] {
        return this._entries.map(({item}) => item)
    }

    add<Kind extends SpwItemKind>(item: SpwNode<Kind>): this {
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

