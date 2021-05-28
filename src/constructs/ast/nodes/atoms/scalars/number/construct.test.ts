import {NumberNode} from '@constructs/ast/nodes/atoms/scalars/number/construct';
import {SpwConstruct} from '@constructs/ast/_abstract/spwConstruct';
import {InteractionContext} from '@constructs/ast/_abstract/_types';
import {RawSpwConstruct} from '@constructs/ast/_abstract/_types/internal';
import {hydrateRecursively} from '@constructs/ast/_abstract/_util/hydrate/recursive';
import {joinHydratedProperties} from '@constructs/ast/_abstract/_util/hydrate/_/util';
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
        const raw     = {value: '4', kind: 'number'};
        const options = {
            hydrate: (raw: RawSpwConstruct, context: InteractionContext) => hydrateRecursively(raw, context) as SpwConstruct | null,
        }

        const {node, promise} = _hydrate(raw, options);

        NumberNode.components.value.asyncGenerator = async function* (_: any, context: InteractionContext | null) {
            yield [4000, context]
        };

        expect(node).toBeInstanceOf(NumberNode);
        const out = await promise;
        expect(out.internal.value).toEqual(4000);
    });
})

function _hydrate(node: any, context: any) {
    const {node: hydratedNode, promise} = hydrateShallow(node as RawSpwConstruct, context);
    context.absorb?.(hydratedNode);
    return {
        node:    hydratedNode,
        promise: Promise.resolve(promise)
                        .then(([p]) => new NumberNode(joinHydratedProperties(p))),
    };
}