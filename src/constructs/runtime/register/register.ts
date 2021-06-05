import {SpwConstruct} from '../../ast/_abstract/spwConstruct';

export interface RegisterEntry<T = SpwConstruct> {
    location: number;
    item: T;
}

interface RegisterParameters<Location = number> {
    memory?: number | null;
    locator?: RegisterLocator<Location>
}

function unshift<U>(addition: U, prev: Iterable<U>, memory: number | null) {
    // todo: this is bad, as it's always an O(len) operation (instead of being O(memory))
    let items = [addition, ...prev];
    if (memory !== null) {
        items = items.slice(0, memory)
    }
    return items;
}

type RegisterLocator<Location extends any = number> = { here: () => Location | number };

const defaultLocator = {
    here: () => Date.now(),
} as RegisterLocator;

/**
 * Acts like a stack
 */
export class Register<T = SpwConstruct, ItemLocation extends any = number> {
    /**
     * Returns a location at which this item is stored
     *
     * @protected
     */
    protected locator: RegisterLocator<ItemLocation>;

    private readonly memory: number | null;

    private counter = 0;

    private _entries: Array<RegisterEntry<T>> = [];

    constructor(
        seed: Iterable<T> | null            = null,
        {
            locator,
            memory = null,
        }: RegisterParameters<ItemLocation> =
            {
                memory: null,
            },
    ) {
        this.memory  = memory;
        this.locator = locator ?? defaultLocator as RegisterLocator<ItemLocation>;

        if (!seed) return;

        for (const item of seed) {
            this.push(item);
        }
    }

    /**
     * Retrieve all entries (items, and their location)
     */
    get entries(): RegisterEntry<T>[] {
        return this._entries;
    }

    /**
     * Retrieve all items
     */
    get flat(): T[] {
        return this._entries.map(({item}) => item)
    }

    /**
     * Return an item based on the index provided.
     *
     * Right now, this is similar to
     *
     * @param index
     */
    resolve(index: string | number = 0): T | null {
        if (typeof index === 'string') {
            // the idea of <{the index} being something other than {the desired item's}>
            throw new Error('Cannot resolve with strings yet')
        }

        return this._entries[index]?.item ?? null;
    }

    /**
     * Add an item to a register, typically in the most salient position
     *
     * @param item
     */
    push(item: T): this {
        const registerValue =
                  {
                      item,

                      location: this.locator.here(),

                      key: this.counter++,
                  } as RegisterEntry<T>;

        if (this.memory === 1) {
            this._entries[0] = registerValue
        } else {
            const prev    = this._entries || [];
            this._entries = unshift(registerValue, prev, this.memory);
        }

        return this;
    }
}

