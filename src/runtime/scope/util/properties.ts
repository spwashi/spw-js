import {SpwNode} from '../../../ast/node/spwNode';
import {SpwNodeKind} from '../../../ast/node';

export default function getGeneration(spwNode: SpwNode): number {
    const parent = spwNode.getProp('parent');
    if (parent && parent !== spwNode) {
        const parentGeneration = getGeneration(parent);
        switch (parent.kind as SpwNodeKind) {
            case 'strand':
                return parentGeneration;
        }
        return parentGeneration + 1;
    } else {
        return 0;
    }
}

