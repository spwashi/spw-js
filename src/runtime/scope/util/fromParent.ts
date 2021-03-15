import {getOrderInParent} from './getOrderInParent';
import {SpwStrandNode} from '../../../ast/node/nodeTypes/strandNode';
import {SpwNode} from '../../../ast/node/spwNode';

function getRelativesInStrand(parent: SpwStrandNode, node: SpwNode) {
    let seqNode;
    let strandDistance    = 0;
    let firstNodeInStrand = (parent as SpwStrandNode).head;

    while (seqNode = (seqNode ?? node).getProp('prev')) {
        strandDistance += 1;
    }

    let orderInParent;
    let firstNodeInBlock;

    if (firstNodeInStrand === node) {
        ({orderInParent, firstNodeInBlock: firstNodeInBlock} = getOrderInParent(parent.getProp('parent'), parent));
    }
    return {strandDistance, firstNodeInStrand, orderInParent, firstNodeInBlock};
}
export function getRelativesFromParent(parent: SpwNode, node: SpwNode) {
    let firstNodeInBlock: SpwNode | undefined;
    let firstNodeInStrand: SpwNode | undefined;
    let orderInParent: number | undefined;
    let strandDistance: number | undefined;

    switch (parent?.kind) {
        case 'strand':
            ({
                firstNodeInBlock,
                firstNodeInStrand,
                orderInParent,
                strandDistance,
            } = getRelativesInStrand(parent as SpwStrandNode, node));
            break;
        case 'concept':
        case 'domain':
        case 'phrase':
        case 'essence':
            ({
                orderInParent,
                firstNodeInBlock: firstNodeInBlock,
            } = getOrderInParent(parent as SpwNode & { body: Array<SpwNode> }, node));
            break;
    }
    return {
        firstNodeInBlock,
        firstNodeInStrand,
        orderInParent,
        strandDistance,
    }
}