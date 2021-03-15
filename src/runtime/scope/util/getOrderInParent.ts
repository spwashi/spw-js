import {SpwStrandNode} from '../../../ast/node/nodeTypes/strandNode';
import {SpwNode} from '../../../ast/node/spwNode';

export function getOrderInParent(parent: SpwNode & { body: Array<SpwNode> }, node: SpwNode) {
    let orderInParent = 0;
    let firstNodeInBlock;
    const isBlockNode = !!parent.kind && ['domain', 'essence', 'concept'].includes(parent.kind);
    for (let seqNode of parent.body || []) {
        if (isBlockNode && !firstNodeInBlock) firstNodeInBlock = seqNode;
        if (seqNode === node) { break; }
        orderInParent++;
    }
    if (isBlockNode && firstNodeInBlock?.kind === 'strand') {
        firstNodeInBlock = (firstNodeInBlock as SpwStrandNode).head;
    }
    return {orderInParent, firstNodeInBlock: firstNodeInBlock};
}