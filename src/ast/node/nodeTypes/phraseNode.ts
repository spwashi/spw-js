import {SpwNode, SpwNodeKeyValue} from '../spwNode';

export class SpwPhraseNode extends SpwNode {
    protected _body?: SpwNode[];

    set(key: keyof this, value: SpwNodeKeyValue): this {
        super.set(key, value);

        // assuming: `this._body` exists as a result of the parent setter
        switch (key) {
            case 'key':
                let k     = (value as SpwNode[]).reduce((p: SpwNode[], c: SpwNode | SpwNode[]) => [...p, ...(Array.isArray(c) ? c : [c])], []);
                this._key = k.map(n => n.key).join(' ');
                k.forEach(node => node.setProp('parent', this))
                this._body = k;
                return this;
        }
        return this;
    }
}