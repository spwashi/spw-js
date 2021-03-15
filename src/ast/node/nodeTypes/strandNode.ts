import {SpwNode, SpwNodeKeyValue} from '../spwNode';
import {StrandEntry} from '../../../runtime/scope/strandEntry';
import {ISpwContainerNode} from '../../../runtime/scope/types/container';

type SpwStrandTail = SpwNode & { node: SpwNode, transport: SpwNode };
type UninitializedConjunctionArr = Array<SpwStrandTail | SpwNode>;

export class SpwStrandNode extends SpwNode implements ISpwContainerNode<SpwStrandNode> {
    static kind                       = 'strand';
    protected _entries: StrandEntry[] = [];
    protected _head?: SpwNode;
    protected _tail?: SpwNode;
    protected _conjunction: SpwNode[] = [];
    private __doneInitializing        = false;
    get head() {
        return this._head;
    }
    get tail() {
        return this._tail;
    }
    get conjunction(): SpwNode[] {
        return this._conjunction;
    }
    get entries(): StrandEntry[] {
        return this._entries;
    }
    set(key: keyof this, value: SpwNodeKeyValue): this {
        const _internalRet = this._internalSetter(key, value);
        this.setNodeProps();
        if (_internalRet) return this;

        super.set(key, value);
        return this;
    }
    private _internalSetter(key: keyof this, value: SpwNodeKeyValue) {
        switch (key) {
            case 'head':
                this._head = (value as SpwNode);
                this._head.setProp('parent', this);
                return this;
            case 'tail':
                if (!Array.isArray(value)) {
                    throw new Error('Not sure how to handle this tail')
                }
                const lastIndex = value.length - 1;
                const last      = value[lastIndex] as SpwStrandTail;
                this._tail      = last.node;
                this._tail.setProp('parent', this);
                this._conjunction =
                    (value as SpwStrandTail[])
                        .reduce(
                            (arr: UninitializedConjunctionArr, curr: SpwStrandTail, i) => {
                                let next = [...arr, curr.transport];
                                if (i !== lastIndex) {
                                    next.push(curr.node);
                                }
                                curr.node.setProp('parent', this);
                                curr.transport.setProp('parent', this);
                                return next;
                            },
                            [],
                        );
                return this;
            case 'key':
                this._key = this.nodes?.map(n => n.key).join(' ') ?? (value as string);
                return this
        }
        return this
    }
    private setNodeProps() {
        if (this.__doneInitializing) return;
        if (!this._head || !this._tail) { return; }

        this.__doneInitializing = true;
        const nodeList          = this._initNodeList(this._head, this._tail, this._conjunction ?? []);
        this._head.setProp('parent', this);
        this._tail.setProp('parent', this);
        this.setProp('nodes', nodeList);
        this._entries = nodeList.filter(node => node.kind !== 'transport').map(node => node.scope.entry = new StrandEntry(this, node));
    }
    private _initNodeList(head: SpwNode, tail: SpwNode, conjunction: SpwNode[]) {
        if (!conjunction?.length) {
            head.setProp('next', tail)
            tail.setProp('prev', head);
            return [head, tail];
        }

        const lastIndex = conjunction.length - 1;
        const nodeList  = [head];

        conjunction.reduce((prev, curr, i) => {
            curr.setProp('prev', prev);
            prev.setProp('next', curr);

            nodeList.push(curr);

            if (i === lastIndex) {
                curr.setProp('next', tail);
                tail?.setProp('prev', curr);
            }
            return curr;
        }, head);

        nodeList.push(tail);
        return nodeList;
    }
}