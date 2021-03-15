import {InternalPropKey, InternalProps, SpwNodeLocation, UnhydratedSpwNode} from '../types';
import {SpwNodeKind} from './index';
import {parseLocation, stringifyLocation} from './util/location';
import {Scope} from '../../runtime/scope/scope';

export type SpwNodeKeyValue = string | number | SpwNode | SpwNodeKeyValue[];

export class SpwNode {
    static readonly _cache                     = new Map();
    protected readonly _scope: Scope<any, any> = new Scope(this);
    protected readonly _location: SpwNodeLocation;
    protected readonly _props: InternalProps   = {nodes: []};
    protected readonly _unhydrated: UnhydratedSpwNode;
    protected readonly _kind: SpwNodeKind;
    protected _key: string | false             = false;
    private readonly _src: string;

    // Properties
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
    get kind(): SpwNodeKind {
        return this._kind;
    }
    get key(): string {
        return this._key || '';
    }
    get parent(): SpwNode | undefined {
        return this.getProp('parent');
    }
    get owner(): SpwNode | undefined {
        return this.getProp('owner');
    }
    get nodes(): SpwNode[] | undefined {
        return this.getProp('nodes');
    }
    get scope() {
        return this._scope;
    }
    get location(): SpwNodeLocation {
        return this._location;
    }
    static getCacheKey(_cachePrefix: string, {location}: { location: SpwNodeLocation }) {
        return _cachePrefix + stringifyLocation(location);
    }
    setProp(key: InternalPropKey, value: InternalProps[InternalPropKey]) {
        this._props[key] = value;
    }
    getProp<K extends InternalPropKey>(key: InternalPropKey): InternalProps[K] {
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
}

export function isSpwNode(node: any): node is SpwNode {
    return (node instanceof SpwNode) || (node.key && node.kind);
}
