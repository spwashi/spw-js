import {NumberNode} from '@constructs/ast/nodes/atoms/scalars/number/construct';
import {SpwConstruct} from '@constructs/ast/_abstract/spwConstruct';
import {InteractionContext, PlainInteractionContext} from '@constructs/ast/_abstract/_types';
import {RawSpwConstruct} from '@constructs/ast/_abstract/_types/internal';
import {hydrateRecursively} from '@constructs/ast/_abstract/_util/hydrate/recursive';
import {HydrationContext, joinHydratedProperties} from '@constructs/ast/_abstract/_util/hydrate/_/util';
import {hydrateShallow} from '@constructs/ast/_abstract/_util/hydrate/shallow';

describe('Number', () => {
    it('should be instantiable', function () {
        const n = new NumberNode({kind: 'number', value: '4'})
        expect(n.key).toEqual('4');
    });
    it('should be instantiable', function () {
        const n = new NumberNode({kind: 'number', value: '4'})
        expect(n.key).toEqual('4');
    });
    it('should be hydrate-able', async function () {
        const raw             = {value: '4', kind: 'number'};
        const context         = initHydrationContext();
        const {node, promise} = hydrateNumber(raw, context);

        NumberNode.components.value.asyncGenerator = async function* (_: any, context: InteractionContext | null) {
            yield [4000, context];
            return null;
        };

        expect(node).toBeInstanceOf(NumberNode);
        const out = await promise;
        expect(out.internal.value).toEqual(4000);
    });
})

/**
 * Initialize a hydration context that will let us test this Node
 */
function initHydrationContext() {
    const hydrationContextFragment =
              {
                  hydrate: (raw: RawSpwConstruct, context: InteractionContext) =>
                               hydrateRecursively(raw, context) as SpwConstruct | null,
              } as Partial<HydrationContext>;

    const context =
              PlainInteractionContext()
                  .enter(hydrationContextFragment);
    return context;
}

/**
 * Function for hydrating
 *
 * @param node
 * @param context
 */
function hydrateNumber(node: any, context: HydrationContext) {
    const {node: hydratedNode, promise} = hydrateShallow(node as RawSpwConstruct, context);
    context.absorb?.(hydratedNode);
    return {
        node:    hydratedNode,
        promise: Promise.resolve(promise)
                        .then(([p]) => new NumberNode(joinHydratedProperties(p))),
    };
}