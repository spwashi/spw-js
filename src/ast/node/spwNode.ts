import {InternalPropKey, InternalProps, LineColumnOffset, SpwNodeLocation, UnhydratedSpwNode} from '../types';

export type SpwNodeKeyValue = string | number | SpwNode | SpwNodeKeyValue[];

function formatLCO(start: LineColumnOffset) {
    return [start.line, start.column].join('|');
}


export class SpwNode {
    readonly #_location: SpwNodeLocation;
    readonly #_props: InternalProps =
                  {
                      nodes: [],
                  };
    readonly #_node: UnhydratedSpwNode;

    constructor(node: UnhydratedSpwNode) {
        const {kind, location} = node;

        this.#_node     = node;
        this.#_kind     = kind;
        this.#_location = location;
    }

    get props(): { [p: string]: any } {
        return this.#_props;
    }

    #_kind: string;

    get kind(): string {
        return this.#_kind;
    }

    set kind(value: string) {
        this.#_kind = value;
    }

    protected _key?: string;

    get key(): string {
        if (!this._key) return '&';
        return this._key;
    }

    get location(): SpwNodeLocation {
        return this.#_location;
    }

    set(key: keyof this, value: SpwNodeKeyValue): this {
        switch (key) {
            case 'key':
                this._key = (value as string);
                return this;
        }
        // @ts-ignore
        this[key] = value;
        return this;
    }

    setProp(key: InternalPropKey, value: InternalProps[InternalPropKey]) {
        this.#_props[key] = value;
    }

    getProp(key: InternalPropKey) {
        return this.#_props[key] ?? undefined;
    }

    toJSON() {
        const {kind, location, ...rest} = this.#_node;
        const {start, end}              = location;
        return {
            kind,
            ...Object.entries(rest)
                     .map(
                         ([k, v]) => {
                             // @ts-ignore
                             let vv = this[k] ?? v;
                             return [k, vv];
                         },
                     )
                     .reduce(
                         (acc, [k, v]) => ({...acc, [k]: v}),
                         {},
                     ),
            location: [formatLCO(start), formatLCO(end)].join(' '),
        }
    }
}

export function isSpwNode(node: any): node is SpwNode {
    return (node instanceof SpwNode) || (node.key && node.kind);
}
