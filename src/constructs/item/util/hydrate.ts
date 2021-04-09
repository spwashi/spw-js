import {SpwNode} from '../impl/nodes/abstract/node';
import {spwNodeConstructors, SpwNodeKind} from '../../index';
import {UnhydratedSpwItem} from '../impl/nodes/abstract/interfaces/node';
import {SpwItem} from '../abstract/item';

interface HydrationContext {
    location: unknown;

    absorb(spwNode: SpwItem): SpwItem;
}

async function _hydrateInner(node: UnhydratedSpwItem, runtime: HydrationContext) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {kind, src, location, key, ...rest} = node;

    Object.assign(location, runtime.location)

    const Constructor      = spwNodeConstructors[kind as SpwNodeKind] || SpwNode;
    const spwNode: SpwItem = new Constructor(node);

    // Hydrate and set the properties
    const hydrationPromises =
              Object.entries(rest)
                    .map(async ([k, v]) => {
                        node[k] = v && ((v as SpwItem).kind || Array.isArray(v))
                                  ? await hydrate((v as HydrationInput), runtime)
                                  : v;
                    })

    await Promise.all(hydrationPromises)

    return spwNode;
}


type HydrationInput = UnhydratedSpwItem | UnhydratedSpwItem[];

/**
 *
 * @param node
 * @param runtime
 * @param _cache
 */
export async function hydrate(node: HydrationInput, runtime: HydrationContext, _cache = new Map()): Promise<SpwItem | SpwItem[]> {
    if (_cache.has(node)) return _cache.get(node);
    if (Array.isArray(node)) {
        const all = await Promise.all(
            node.map((node) => hydrate(node, runtime, _cache)),
        );
        return all.filter(Boolean).reduce((acc: SpwItem[], val) => acc.concat(val as SpwItem), []);
    }

    if (!node?.kind) {
        console.error('Cannot hydrate node');
        console.error(node);
        throw new Error('Cannot incorporate node');
    }

    const spwNode = await _hydrateInner(node, runtime);
    _cache.set(node, spwNode)
    return runtime.absorb(spwNode);
}