import {SpwNode} from '../../ast/node/spwNode';
import {BlockEntry, SpwBlockNode} from '../../ast/node/nodeTypes/helper/block/blockNode';
import getGeneration from './util/properties';
import {ISpwContainerNode} from './types/container';
import {StrandEntry} from './strandEntry';

export type ScopeProperties = {
    generation: number;
    orderInParent: number | undefined;

    self: SpwNode;
    owner?: SpwNode;
    parent?: SpwNode;
    scope: SpwNode;

    readonly  outerScope: any | undefined;
    readonly ownerScope: ScopeProperties | undefined;
    readonly scopeRelationships: any | undefined;

    phrase: { orderInParent: number | undefined; },
    block: {
        firstNode: SpwNode | undefined;
        nearest: SpwBlockNode
        orderInParent: number | undefined;
        readonly siblings: SpwNode[]
    }
};
const _neighborCache = new Map()

export class SubscopeContainer<N extends SpwNode, C extends ISpwContainerNode<any> = ISpwContainerNode<any>> {
    _parent: Scope<N, C>;
    private _blockEntry?: BlockEntry;
    private _strandEntry?: StrandEntry;
    constructor(parentScope: Scope<N, C>) {
        this._parent = parentScope
    }
    get blockEntry(): BlockEntry | undefined {
        return this._blockEntry;
    }
    set blockEntry(value: BlockEntry | undefined) {
        this._blockEntry = value;
    }
    get strandEntry(): StrandEntry | undefined {
        return this._strandEntry;
    }
    set strandEntry(value: StrandEntry | undefined) {
        this._strandEntry = value;
    }
}

export class Scope<N extends SpwNode = SpwNode, C extends ISpwContainerNode<any> = ISpwContainerNode<any>> {
    _node: N;
    _generation?: number;

    private readonly _subscopes: SubscopeContainer<N, C>;

    constructor(node: N) {
        this._node      = node;
        this._subscopes = new SubscopeContainer<N, C>(this);
    }
    get subscopes() {
        return this._subscopes;
    }
    get node() {
        return this._node;
    }
    get generation(): number {
        if (this._generation != null) {
            return this._generation;
        }

        if (this.node.owner) {
            return this._generation = this.node.owner.scope.generation;
        }

        return this._generation = getGeneration(this._node);
    };


    /**
     * Scope of the parent or owner
     */
    get outerScope() {
        if (this.node.owner)
            return this.node.owner.scope;

        if (this.node.parent)
            return this.node.parent.scope;

        return undefined;
    }
}


class PhraseEntry {

}

