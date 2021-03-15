import {SpwNode, SpwNodeKeyValue} from '../../../spwNode';
import {ISpwContainerNode, ISpwNodeEntry} from '../../../../../runtime/scope/types/container';

export interface BoundaryNode {
    objective: SpwNode | undefined;
    subjective: SpwNode | undefined;
}

export class BlockEntry<T extends SpwBlockNode<T> = SpwBlockNode> implements ISpwNodeEntry<SpwBlockNode<T>> {
    private readonly _node: SpwNode;
    private readonly _block: T;
    constructor(block: T, node: SpwNode) {
        this._node  = node;
        this._block = block;
    }
    get container() {
        return this._block;
    }
    get node() {
        return this._node;
    }
}

type IBlockNode = {
    keyOpener: string;
    keyCloser: string;
};

export abstract class SpwBlockNode<T extends SpwBlockNode = any> extends SpwNode implements IBlockNode, ISpwContainerNode<T> {
    readonly abstract keyOpener: string;
    readonly abstract keyCloser: string;
    protected _entries: BlockEntry<T>[] = [];
    protected _body: Array<SpwNode>     = new Array<SpwNode>();
    private _objective?: SpwNode | undefined;
    private _subjective?: SpwNode | undefined;
    get body() {
        return this._body;
    }
    get objective() {
        return this._objective;
    }
    get subjective() {
        return this._subjective;
    }
    get entries() {
        return this._entries;
    }
    set(key: keyof this | 'objective_anchor' | 'subjective_anchor', value: SpwNodeKeyValue): this {
        switch (key) {
            case 'key':
                const opener = this.keyOpener;
                const closer = this.keyCloser;

                this._key =
                    [
                        [opener, this.objective?.key].filter(Boolean).join('_'),
                        this.body.map(node => node.key).join(', '),
                        [this.subjective?.key, closer].filter(Boolean).join('_'),
                    ].join(' ')
                return this;
            case 'objective':
            case 'objective_anchor':
                this._objective = value as SpwNode;
                this._objective.setProp('owner', this)
                return this;
            case 'subjective':
            case 'subjective_anchor':
                this._subjective = value as SpwNode;
                this._subjective.setProp('owner', this)
                return this;
            case 'body':
                this._body    = value as Array<SpwNode>;
                this._entries = this._body.map(node => {
                    node.setProp('parent', this);
                    return new BlockEntry<T>(this as unknown as T, node);
                })
                this.setProp('nodes', Array.from(this._body ?? []));
                return this;
        }
        super.set(key, value);


        return this;
    }

}