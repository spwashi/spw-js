import {SpwNode} from '../nodes/_abstract/node';
import {spwItemConstructors, SpwItemKind} from '../../index';
import {HydratedSpwItem, RawSpwItem, SpwItemValue} from '../_abstract/interfaces/internal';
import {SpwItem} from '../_abstract/item';

interface HydrationContext {
    location: unknown;

    absorb(spwNode: SpwItem): SpwItem | null;
}

type HydrationInput = RawSpwItem | RawSpwItem[] | SpwItemValue;
type HydrationOutput = SpwItem | SpwItem[] | { [k: string]: SpwItemValue } | null;

function _hydrateInner(node: RawSpwItem, runtime: HydrationContext) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {kind, src, location: unhydratedLocation, key, ...rest} = node;

    const location    = unhydratedLocation ? Object.assign(unhydratedLocation, runtime.location) : null;
    const Constructor = (spwItemConstructors[kind as SpwItemKind] || SpwNode) as unknown as typeof SpwNode;

    const hydrated: Partial<HydratedSpwItem> = {kind, location: location ?? null};

    // Hydrate and set the properties
    Object.entries(rest)
          .map(([k, v]) => {
              const hydrateValue =
                        (v: SpwItem | HydrationInput | SpwItemValue) =>
                            v && ((v as SpwItem).kind || Array.isArray(v))
                            ? hydrate((v as HydrationInput), runtime)
                            : (
                                v && typeof v === 'object'
                                ? Object.fromEntries(Object.entries(v).map(([kk, vv]) => [kk, hydrate(vv as HydrationInput, runtime)]))
                                : v
                            );
              hydrated[k]        = hydrateValue(v as SpwItemValue);
          })

    const spwNode: SpwItem = new Constructor(node, hydrated as HydratedSpwItem);
    Object.freeze(spwNode.hydrated);

    return spwNode;
}

/**
 *
 * @param node
 * @param runtime
 * @param _cache
 */
export function hydrate(node: HydrationInput, runtime: HydrationContext, _cache = new Map()): HydrationOutput {
    if (_cache.has(node)) return _cache.get(node);
    if (Array.isArray(node)) {
        const all = node.map((node) => hydrate(node, runtime, _cache));
        return all.filter(Boolean).reduce((acc: SpwItem[], val) => acc.concat(val as SpwItem), []);
    }

    const n = node as unknown as { [k: string]: HydrationInput };
    if (!n?.kind) {
        if (!n || typeof n !== 'object') return n;
        return Object.fromEntries(
            Object.entries(n)
                  .map(([k, v]) => [k, hydrate(v, runtime, _cache)]),
        ) as HydrationOutput
    }

    const spwNode = _hydrateInner(node as RawSpwItem, runtime);
    _cache.set(node, spwNode)
    return runtime.absorb(spwNode);
}