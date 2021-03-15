import {SpwNode} from '../../../ast/node/spwNode';

const $$_BlockNodeTypes = ['concept', 'domain', 'essence'];
export function getNearestBlock(node: SpwNode) {
    let nearestBlock;
    {
        let _parent;
        while (_parent = (_parent ?? node).getProp('parent')) {
            if ($$_BlockNodeTypes.includes(_parent.kind)) {
                nearestBlock = _parent;
                break;
            }
        }
    }
    return nearestBlock;
}