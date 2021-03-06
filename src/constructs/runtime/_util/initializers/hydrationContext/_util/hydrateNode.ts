import { RawConstruct } from '@constructs/ast/_abstract/_types/internal';
import { HydrationContext } from '@constructs/ast/_abstract/_util/hydrate/_/util';
import { Construct } from '../../../../../ast/_abstract/construct';
import { hydrateShallow } from '@constructs/ast/_abstract/_util/hydrate/shallow';

/**
 * For each Node,
 *    - hydrate the Node recursively
 *    - absorb the Node into the Context (if applicable)
 *
 * @param node
 * @param context
 */
export function hydrateNode(node: RawConstruct, context: HydrationContext): Construct | null {
  return hydrateShallow(node, context).node;
}
