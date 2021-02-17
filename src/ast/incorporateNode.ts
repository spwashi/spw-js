import {UnhydratedSpwNode} from './types';
import {SpwNode, SpwNodeKeyValue} from './node/spwNode';
import {spwNodeConstructors, SpwNodeKind} from './node';

interface HydrationContext {
    location: {}

    absorb(spwNode: SpwNode): SpwNode;
}

async function hydrateNode(node: UnhydratedSpwNode, runtime: HydrationContext) {
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

    return spwNode;
}


type HydrationInput = UnhydratedSpwNode | UnhydratedSpwNode[] | any;

export async function incorporateNode(node: HydrationInput, runtime: HydrationContext): Promise<SpwNodeKeyValue> {
    if (Array.isArray(node)) {
        const hydrateChild = (node: HydrationInput): Promise<SpwNodeKeyValue> => incorporateNode(node, runtime);

        return Promise.all(node.map(hydrateChild));
    }

    if (!node?.kind) {
        console.log(node)
        return node;
    }

    const spwNode = await hydrateNode(node, runtime);

    return runtime.absorb(spwNode);
}