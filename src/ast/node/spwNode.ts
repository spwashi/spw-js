import {InternalPropKey, InternalProps, LineColumnOffset, SpwNodeLocation, UnhydratedSpwNode} from '../types';

export type SpwNodeKeyValue = string | number | SpwNode | SpwNodeKeyValue[];

function formatLCO(start: LineColumnOffset) {
    return [start.line, start.column].join('|');
}


export class SpwNode {
    protected readonly _location: SpwNodeLocation;
    protected readonly _props: InternalProps =
                           {
                               nodes: [],
                           };
    protected readonly _unhydrated: UnhydratedSpwNode;

    constructor(node: UnhydratedSpwNode) {
        const {kind, location} = node;

        this._unhydrated = node;
        this._kind       = kind;
        this._location   = location;
    }

    protected _nodeId: string | undefined;

    get nodeId() {
        if (!this._nodeId) this.generateNodeId();

        return this._nodeId;
    }

    get props(): { [p: string]: any } {
        return this._props;
    }

    protected _kind: string;

    get kind(): string {
        return this._kind;
    }

    set kind(value: string) {
        this._kind = value;
    }

    protected _key?: string;

    get key(): string {
        if (!this._key) return '&';
        return this._key;
    }

    get location(): SpwNodeLocation {
        return this._location;
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
        this._props[key] = value;
    }

    getProp(key: InternalPropKey) {
        return this._props[key] ?? undefined;
    }

    __json() {
        const {kind, location, ...rest} = this._unhydrated;

        return {
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
        }
    }

    toJSON() {
        const {kind, location, ...rest} = this._unhydrated;
        const {start, end}              = location;
        return {
            kind,
            ...this.__json(),
            location: [formatLCO(start), formatLCO(end)].join(' '),
        }
    }

    protected generateNodeId() {
        this._nodeId = this.key;
    }
}

export function isSpwNode(node: any): node is SpwNode {
    return (node instanceof SpwNode) || (node.key && node.kind);
}
