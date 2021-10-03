import { initInteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/initInteractionContext';
import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';
import { RawConstruct } from '@constructs/ast/_abstract/_types/internal';
import {
  HydrationContext,
  joinHydratedProperties,
} from '@constructs/ast/_abstract/_util/hydrate/_util/util';
import { hydrateShallow } from '@constructs/ast/_abstract/_util/hydrate/shallow';
import { NumberNode } from '@constructs/ast/nodes/scalars/number/construct';

describe('Number', () => {
  it('should be instantiable', function () {
    const n = new NumberNode({ kind: 'number', value: '4' });
    expect(n.key).toEqual('4');
  });
  it('should be instantiable', function () {
    const n = new NumberNode({ kind: 'number', value: '4' });
    expect(n.key).toEqual('4');
  });
  it('should be hydrate-able', async function () {
    const raw = { value: '4', kind: 'number' };
    const context = initInteractionContext() as HydrationContext;
    const { node, promise } = hydrateNumber(raw, context);

    NumberNode.components.value.asyncGenerator = async function* (
      _: any,
      context: InteractionContext | null,
    ) {
      yield [4000, context];
      return null;
    };

    expect(node).toBeInstanceOf(NumberNode);
    const out = await promise;
    expect(out.internal.value).toEqual(4000);
  });
});

/**
 * Function for hydrating
 *
 * @param raw
 * @param context
 */
function hydrateNumber(raw: any, context: HydrationContext) {
  const { node: hydratedNode, promise } = hydrateShallow(raw as RawConstruct, context);
  if (context.absorb) {
    context.absorb(hydratedNode);
  }
  return {
    node: hydratedNode,
    promise: Promise.resolve(promise).then(([p]) => new NumberNode(joinHydratedProperties(p))),
  };
}
