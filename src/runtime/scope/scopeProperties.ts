import getGeneration from './util/properties';
import {getRelativesFromParent} from './util/fromParent';
import {getNearestBlock} from './util/nearestBlock';
import {SpwStrandNode} from '../../ast/node/nodeTypes/strandNode';
import {SpwNode} from '../../ast/node/spwNode';
import {SpwBlockNode} from '../../ast/node/nodeTypes/helper/block/blockNode';
import {ScopeProperties} from './scope';

const _neighborCache      = new Map()
const $$_ExcludeNodeTypes = ['strand', 'node'];


/**
 * Returns an object
 *
 * @param node
 */
export function getNodeInfo(node: SpwNode): ScopeProperties {
    // cache
    if (_neighborCache.has(node)) return _neighborCache.get(node);

    // properties
    const owner  = node.getProp('owner');
    const parent = node.getProp('parent');

    const {
              firstNodeInStrand,
              orderInParent,
              strandDistance,
              firstNodeInBlock,
          } = getRelativesFromParent(parent, node);

    let _nearestBlock: SpwBlockNode;
    const nodeInfo =
              {
                  self:       node,
                  generation: owner ? (getGeneration(owner)) : (getGeneration(node)),

                  orderInParent,

                  // parent

                  parent,
                  get outerScope() { return _neighborCache.get(parent) },

                  // EffectiveParent

                  scope: $$_ExcludeNodeTypes.includes(parent?.kind) ? parent?.getProp('parent') : parent,
                  get scopeRelationships() { return _neighborCache.get(parent) },

                  // Owner

                  owner,
                  get ownerScope() { return _neighborCache.get(owner) },

                  // Specific Node Types

                  phrase:
                      {
                          orderInParent,
                      },

                  strand:
                      {
                          orderInParent,
                          firstNode:        firstNodeInStrand,
                          distanceFromHead: strandDistance,

                          get siblings() {
                              if (!parent || (parent.kind !== 'strand')) return [];
                              return parent.getProp('nodes')?.filter((n: SpwNode) => n !== node && n?.kind !== 'transport');
                              return [];
                          },
                      },

                  block:
                      {
                          orderInParent,
                          get nearest() {
                              return _nearestBlock = _nearestBlock ?? getNearestBlock(node)
                          },
                          firstNode: firstNodeInBlock,
                          get siblings() {
                              const blockNode = this.nearest;
                              if (!blockNode || getGeneration(blockNode) - getGeneration(node) > 1) return [];
                              const body             = blockNode?.body as unknown as SpwNode[] | undefined ?? [];
                              const distanceFromHead = nodeInfo.strand.distanceFromHead;
                              if (body.length <= 1) return [];

                              if (parent.kind === 'strand' && typeof distanceFromHead !== 'undefined') {
                                  const siblings = body.filter(node => node.kind === 'strand')
                                                       .map((node: SpwNode) =>
                                                                (
                                                                    (node as SpwStrandNode).getProp('nodes') ?? []
                                                                )[distanceFromHead])
                                                       .filter(n => n !== node);

                                  Object.defineProperty(this, 'siblings', {value: siblings})

                                  console.log(siblings);
                                  return siblings;
                              }

                              return (
                                  body.map(node => {
                                      return node.kind === 'strand' ? (node as SpwStrandNode).head : node;
                                  })
                              )
                          },
                      },
              }

    _neighborCache.set(node, nodeInfo);
    return nodeInfo;
}

export function _clearNodeCache() {
    _neighborCache.clear();
}