import {SpwConstruct} from '@constructs/ast/_abstract/spwConstruct';
import {Register} from '@constructs/runtime/register';
import {hydrateRecursively} from '@constructs/ast/_abstract/_util/hydration/recursive';
import {HydratedSpwItem, RawSpwConstruct} from '@constructs/ast/_abstract/_types/internal';
import {HydrationContext} from '@constructs/ast/_abstract/_util/hydration/util';
import {getConstructClass} from '@constructs/index';
import {hydrateShallow} from '@constructs/ast/_abstract/_util/hydration';
import {spwParser} from '../../../../index';
import {Runtime} from '@constructs/runtime/runtime';


export function getAllRegisteredNodes(runtime: Runtime): SpwConstruct[] {
    const registerValues = runtime.registers.all.entries ?? [];
    return registerValues.map(entry => entry.item);
}

export function getLastRegisteredNode(runtime: Runtime): SpwConstruct | undefined {
    return runtime.registers.lastAcknowledged.entries?.[0]?.item;
}

type RuntimeRegisters =
    {
        all: Register;
        keys: { [p: string]: Register };
        lastAcknowledged: Register
    };

function getHydrationContext(registers: RuntimeRegisters) {
    return {
        location: {id: 'test'},

        hydrate(node: RawSpwConstruct, context: HydrationContext): SpwConstruct | null {
            const Constructor     = getConstructClass(node.kind);
            const subHydratedNode = hydrateRecursively(node,
                                                       {
                                                           hydrate(node, context): SpwConstruct | null {
                                                               return hydrateShallow(node, context).node;
                                                           },
                                                       }) as HydratedSpwItem;

            const hydrated = new Constructor(subHydratedNode);
            context.absorb?.(hydrated);
            return hydrated;
        },

        absorb(node) {
            if (!SpwConstruct.isSpwConstruct(node)) return node;
            if (!node?.internal) return null;
            registers.all.add(node);
            registers.lastAcknowledged.add(node);
            if (node.key) {
                const register = registers.keys[node.key] = registers.keys[node.key] ?? (new Register());
                register.add(node)
            }

            return node;
        },
    } as HydrationContext;
}
export async function startRuntimeWithSrc(src: string): Promise<Runtime> {
    const registers =
              {
                  all:              new Register(),
                  lastAcknowledged: new Register({memory: 1}),
                  keys:             {} as { [k: string]: Register },
              };

    const raw     = spwParser.parse(src, {}) as RawSpwConstruct;
    const context = getHydrationContext(registers);

    hydrateRecursively(raw, context);

    return {registers};
}