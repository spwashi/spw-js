import {UnhydratedSpwNode} from './types';
import {SpwNode} from './node/spwNode';
import {spwNodeConstructors, SpwNodeKind} from './node';

interface HydrationContext {
    location: {}

    absorb(spwNode: SpwNode): SpwNode;
}

const _c = new Map

async function hydrateNode(node: UnhydratedSpwNode, runtime: HydrationContext) {
    if (_c.get(node.key)) {
        return _c.get(node.key);
    }
    const {kind, location, ...rest} = node;

    Object.assign(location, runtime.location)

    const Constructor      = spwNodeConstructors[kind as SpwNodeKind] || SpwNode;
    const spwNode: SpwNode = new Constructor(node);

    // Hydrate and set the properties
    const hydrationPromises =
              Object.entries(rest)
                    .map(
                        async ([k, v]) => {
                            const incorporated =
                                      v.kind || Array.isArray(v)
                                      ? await incorporateNode(v, runtime)
                                      : v;

                            node[k] = incorporated;

                            // @ts-ignore
                            spwNode.set(k, incorporated)
                        },
                    )
    await Promise.all(hydrationPromises);
    _c.set(node, spwNode);
    return spwNode;
}


type HydrationInput = UnhydratedSpwNode | UnhydratedSpwNode[] | any;

/**
 *
 * @param node
 * @param runtime
 * @param _cache
 */
export async function incorporateNode(node: HydrationInput, runtime: HydrationContext, _cache = new Map()): Promise<SpwNode | SpwNode[]> {
    if (_cache.has(node)) return _cache.get(node);
    if (Array.isArray(node)) {
        const all =
                  await Promise.all(
                      node.map((node) => incorporateNode(node, runtime, _cache)),
                  );

        // flatMap
        return all.reduce((acc: SpwNode[], val) => acc.concat(val), []);
    }

    if (!node?.kind) {
        console.error(node)
        throw new Error('Cannot incorporate node');
    }

    const spwNode = await hydrateNode(node, runtime);
    _cache.set(node, spwNode)
    return runtime.absorb(spwNode);
}