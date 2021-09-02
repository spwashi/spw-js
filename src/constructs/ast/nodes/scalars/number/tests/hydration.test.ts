import { NumberNode } from '@constructs/ast/nodes/scalars/number/construct';
import { Construct } from '../../../../_abstract/construct';
import { InteractionContext, PlainInteractionContext } from '@constructs/ast/_abstract/_types';
import { RawConstruct } from '@constructs/ast/_abstract/_types/internal';
import { hydrateRecursively } from '@constructs/ast/_abstract/_util/hydrate/recursive';
import {
  HydrationContext,
  joinHydratedProperties,
} from '@constructs/ast/_abstract/_util/hydrate/_/util';
import { hydrateShallow } from '@constructs/ast/_abstract/_util/hydrate/shallow';

describe('Number', () => {
  it('should be hydrate-able', async function () {
    const raw = { value: '4', kind: 'number' };
    const context = initHydrationContext();
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
 * Initialize a hydration context that will let us test this Node
 */
function initHydrationContext(): HydrationContext {
  const fragment = {
    hydrate: (raw: RawConstruct, context: HydrationContext) =>
      hydrateRecursively(raw, context) as Construct | null,
  } as Partial<HydrationContext>;

  const context = PlainInteractionContext().enter(fragment) as HydrationContext;
  return context;
}

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
