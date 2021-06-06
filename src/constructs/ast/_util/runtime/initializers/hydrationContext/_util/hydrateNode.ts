import {
  HydratedSpwItem,
  RawSpwConstruct,
} from '@constructs/ast/_abstract/_types/internal';
import { HydrationContext } from '@constructs/ast/_abstract/_util/hydrate/_/util';
import { SpwConstruct } from '@constructs/ast/_abstract/spwConstruct';
import { getConstructClass } from '@constructs/index';
import { hydrateShallow } from '@constructs/ast/_abstract/_util/hydrate/shallow';
import { hydrateRecursively } from '@constructs/ast/_abstract/_util/hydrate/recursive';
import { PlainInteractionContext } from '@constructs/ast/_abstract/_types';

/**
 * For each Node,
 *    - hydrate the Node recursively
 *    - absorb the Node into the Context (if applicable)
 *
 * @param node
 * @param context
 */
export function hydrateNode(
  node: RawSpwConstruct,
  context: HydrationContext,
): SpwConstruct | null {
  const Constructor = getConstructClass(node.kind);

  const hydrationContext = PlainInteractionContext().enter({
    /**
     * For one node,
     *    assuming all parameters have been hydrated,
     *        - initialize a Node
     *
     * @param node
     * @param context
     */
    hydrate(node, context): SpwConstruct | null {
      return hydrateShallow(node, context).node;
    },
  } as Partial<HydrationContext>);

  const subHydratedNode = hydrateRecursively(
    node,
    hydrationContext,
  ) as HydratedSpwItem;
  const hydrated = new Constructor(subHydratedNode);

  // declare the node absorbed
  // : note, there's something smelly about the way this node is being absorbed
  context.absorb?.(hydrated);

  return hydrated;
}
