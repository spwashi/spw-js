import {SpwNode, SpwNodeKeyValue} from '../spwNode';

export class SpwPhraseNode extends SpwNode {
    _body: SpwNode[] = [];

    get body(): SpwNode[] | undefined {
        return this._body;
    }

    __json(): any {
        return {...super.__json(), body: this.body};
    }

    set(key: keyof this, value: SpwNodeKeyValue): this {
        switch (key) {
            case 'key':
                let nodes = this._getBodyFromRaw(value);
                this._key = nodes.map(n => n.key).join(' ');
                if (!this._body.length) {
                    const body = this._getBodyFromRaw(value);
                    body.forEach(
                        node => {
                            node.setProp('parent', this);
                            this._body.push(node)
                        },
                    )
                }
                return this;
        }
        super.set(key, value);
        return this;
    }

    private _getBodyFromRaw(value: string | number | SpwNode | SpwNodeKeyValue[]) {
        return (value as SpwNode[]).reduce((p: SpwNode[], c: SpwNode | SpwNode[]) => [...p, ...(Array.isArray(c) ? c : [c])], []);
    }
}