import {SpwNode, SpwNodeKeyValue} from '../spwNode';
import {SpwNodeNode} from './nodeNode';

type SpwStrandTail = SpwNode & { node: SpwNode, transport: SpwNode };
type ConjunctionArr = Array<SpwStrandTail | SpwNode>;

export class SpwStrandNode extends SpwNode {
    #done = false;

    #_head?: SpwNode;

    get head() {
        return this.#_head;
    }

    #_tail?: SpwNode;

    get tail() {
        return this.#_tail;
    }

    #_conjunction?: ConjunctionArr;

    get conjunction() {
        return this.#_conjunction;
    }


    _internalSet(key: keyof this, value: SpwNodeKeyValue) {
        switch (key) {
            case 'head':
                this.#_head = (value as SpwNode);
                this.#_head.setProp('parent', this);
                return this;
            case 'tail':
                if (!Array.isArray(value)) {
                    throw new Error('Not sure how to handle this tail')
                }
                const lastIndex = value.length - 1;
                const last      = value[lastIndex] as SpwStrandTail;
                this.#_tail     = last.node;
                this.#_tail.setProp('parent', this);
                this.#_conjunction =
                    (value as SpwStrandTail[])
                        .reduce(
                            (arr: ConjunctionArr, curr: SpwStrandTail, i) => {
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
        }
    }

    set(key: keyof this, value: SpwNodeKeyValue): this {
        const _internalRet = this._internalSet(key, value);
        this.setNodeProps();
        if (_internalRet) return this;

        super.set(key, value);
        return this;
    }

    private setNodeProps() {
        if (this.#done) return;

        if (this.#_head && this.#_tail) {
            this.#done     = true;
            const nodeList = [this.#_head];

            if (!this.#_conjunction?.length) {
                this.#_head.setProp('next', this.#_tail)
                this.#_tail.setProp('prev', this.#_head)
            } else {
                const lastIndex = this.#_conjunction.length - 1;
                this.#_conjunction
                    .reduce(
                        (prev, curr, i) => {
                            curr.setProp('prev', prev);
                            prev.setProp('next', curr);
                            nodeList.push(curr);
                            if (i === lastIndex) {
                                curr.setProp('next', this.#_tail);
                                this.#_tail?.setProp('prev', curr);
                            }
                            return curr;
                        },
                        this.#_head,
                    )
            }

            this.#_tail && nodeList.push(this.#_tail);
            this.setProp('nodes', nodeList);
        }
    }
}