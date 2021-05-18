import {SpwNode} from '../nodes/_abstract/node';
import {spwItemConstructors, SpwItemKind} from '../../index';
import {HydratedSpwItem, RawSpwItem, SpwItemValue} from '../_abstract/interfaces/internal';
import {SpwItem} from '../_abstract/item';
import {InteractionContext, SpwShape} from '@constructs/ast/_abstract/types';

export interface HydrationContext extends InteractionContext {
    location?: SpwShape;

    hydrate?(node: HydrationInput, context: HydrationContext): SpwItem | null;

    absorb?(spwNode: SpwItem): SpwItem | null;

    [s: string]: SpwShape
}

type HydrationInput =
    RawSpwItem
    | RawSpwItem[]
    | SpwItemValue;
type HydrationOutput =
    SpwItem
    | SpwItem[]
    | { [k: string]: SpwItemValue }
    | null;

function _hydrateInner(node: RawSpwItem, runtime: HydrationContext) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {kind, src, location: unhydratedLocation, key, ...rest} = node;

    const location    = unhydratedLocation ? Object.assign(unhydratedLocation, runtime.location) : null;
    const Constructor = (spwItemConstructors[kind as SpwItemKind] || SpwNode) as unknown as typeof SpwNode;

    const hydrated: Partial<HydratedSpwItem> = {kind, location: location ?? null};

    // Hydrate and set the properties
    Object
        .entries(rest)
        .map(([componentKey, componentValue]) => {
            hydrated[componentKey] =
                (
                    () => {
                        if (!componentValue) {
                            return componentValue;
                        }

                        if ((componentValue as SpwItem).kind || Array.isArray(componentValue)) {
                            return hydrate((componentValue as HydrationInput), runtime)
                        }

                        if (typeof componentValue === 'object') {
                            return Object
                                .fromEntries(
                                    Object.entries(componentValue as Record<string, RawSpwItem>)
                                          .map(([kk, vv]) =>
                                                   [
                                                       kk,
                                                       hydrate(vv as HydrationInput, runtime),
                                                   ]),
                                )
                        }

                        return componentValue;
                    }
                )()
        })

    const spwNode: SpwItem = Constructor.hydrate(hydrated, runtime);

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
    return typeof runtime.absorb === 'function' ? runtime.absorb(spwNode)
                                                : spwNode;
}