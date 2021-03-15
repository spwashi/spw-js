import {SpwNode} from '../../ast/node/spwNode';
import {SpwStrandNode} from '../../ast/node/nodeTypes/strandNode';
import {ISpwNodeEntry} from './types/container';

export class StrandEntry implements ISpwNodeEntry<SpwStrandNode> {
    _index: number | undefined;
    private readonly _node: SpwNode;
    private readonly _strand: SpwStrandNode;

    constructor(parent: SpwStrandNode, node: SpwNode) {
        if (!parent || (parent.kind !== 'strand'))
            throw 'this node is not near a strand boundary';
        this._strand = parent;
        this._node   = node;
    }

    get container() {
        return this._strand;
    }

    get node() {
        return this._node;
    }

    get index(): number {
        if (this._index != null) return this._index;
        return this._index = this.container.entries.indexOf(this);
    }
}