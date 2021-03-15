import {InternalPropKey, InternalProps, SpwNodeLocation, UnhydratedSpwNode} from '../types';
import {SpwNodeKind} from './index';
import {parseLocation, stringifyLocation} from './util/location';

export type SpwNodeKeyValue = string | number | SpwNode | SpwNodeKeyValue[];

export class SpwNode {
    static _cache = new Map();

    protected readonly _location: SpwNodeLocation;
    protected readonly _props: InternalProps = {nodes: []};
    protected readonly _unhydrated: UnhydratedSpwNode;
    protected _nodeId: string | undefined;
    protected _kind: SpwNodeKind;
    protected _key?: string;
    private readonly _src: string;

    constructor(node: UnhydratedSpwNode, _cachePrefix = 'change_if_you_want') {
        const {kind, source} = node;

        const location   = parseLocation(node.location);
        this._src        = source;
        this._unhydrated = node;
        this._kind       = kind;
        this._location   = location;

        const _cacheKey = SpwNode.getCacheKey(_cachePrefix, this);

        // after the others to avoid error TS2564
        if (SpwNode._cache.has(_cacheKey)) return SpwNode._cache.get(_cacheKey);

        SpwNode._cache.set(_cacheKey, this);
    }

    // Properties

    get nodeId() {
        if (!this._nodeId) this.generateNodeId();

        return this._nodeId;
    }
    get props(): { [p: string]: any } {
        return this._props;
    }
    get kind(): SpwNodeKind {
        return this._kind;
    }
    set kind(value: SpwNodeKind) {
        this._kind = value;
    }
    /**
     * string that could be used for identifying
     */
    get key(): string {
        if (!this._key) return '&';
        return this._key;
    }
    get location(): SpwNodeLocation {
        return this._location;
    }

    // Methods

    static getCacheKey(_cachePrefix: string, {location}: { location: SpwNodeLocation }) {
        return _cachePrefix + stringifyLocation(location);
    }

    setProp(key: InternalPropKey, value: InternalProps[InternalPropKey]) {
        this._props[key] = value;
    }
    getProp(key: InternalPropKey) {
        return this._props[key] ?? undefined;
    }
    toJSON() {
        const {kind, location} = this._unhydrated;
        return {
            kind,
            ...this.toJSON__internal(),
            location: stringifyLocation(location),
        }
    }

    // internal methods

    protected toJSON__internal() {
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
    protected set(key: keyof this, value: SpwNodeKeyValue): this {
        switch (key) {
            case 'key':
                this._key = (value as string);
                return this;
        }
        // @ts-ignore
        this[key] = value;
        return this;
    }
    protected generateNodeId() {
        this._nodeId = this.key;
    }
}

export function isSpwNode(node: any): node is SpwNode {
    return (node instanceof SpwNode) || (node.key && node.kind);
}
