import {RuntimeRegisters} from '@constructs/ast/_util/runtime/_types/registers';
import {HydratedSpwItem, RawSpwConstruct} from '@constructs/ast/_abstract/_types/internal';
import {HydrationContext} from '@constructs/ast/_abstract/_util/hydrate/_/util';
import {SpwConstruct} from '@constructs/ast/_abstract/spwConstruct';
import {getConstructClass} from '@constructs/index';
import {hydrateRecursively} from '@constructs/ast/_abstract/_util/hydrate/recursive';
import {hydrateShallow} from '@constructs/ast/_abstract/_util/hydrate/shallow';
import {Register} from '@constructs/runtime/register';

/**
 * Initialize a Node recursively
 *
 *
 * @param node
 * @param context
 */
function hydrateNodeInContext(node: RawSpwConstruct, context: HydrationContext): SpwConstruct | null {
    const Constructor      = getConstructClass(node.kind);
    const hydrationContext =
              {
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
              } as HydrationContext;

    const subHydratedNode = hydrateRecursively(node, hydrationContext) as HydratedSpwItem;
    const hydrated        = new Constructor(subHydratedNode);

    // declare the node absorbed
    // : note, there's something smelly about the way this node is being absorbed
    context.absorb?.(hydrated);

    return hydrated;
}

/**
 * Initialize a HydrationContext {@see HydrationContext}
 *
 * @param registers
 */
export function initHydrationContext(registers: RuntimeRegisters): HydrationContext {

    const hydrationContext: HydrationContext =
              {
                  /**
                   * The current location of the "locating" cursor
                   *
                   * @todo replace this with a register
                   */
                  location:
                      {
                          id: 'test',
                      },

                  /**
                   * For each Node,
                   *    - hydrate the Node recursively
                   *    - absorb the Node into the Context (if applicable)
                   *
                   * @param node
                   * @param context
                   */
                  hydrate: hydrateNodeInContext,

                  /**
                   * For each absorbed Node,
                   *    - if it is not a construct, simply return the node
                   *    - add the node to the relevant registers
                   * @param node
                   */
                  absorb(node) {
                      if (!SpwConstruct.isSpwConstruct(node)) {
                          return node;
                      }

                      registers.all.add(node);
                      registers.lastAcknowledged.add(node);

                      if (node.key) {
                          const register = registers.keys[node.key] = registers.keys[node.key] ?? (new Register());
                          register.add(node)
                      }

                      return node;
                  },
              };

    return hydrationContext;
}