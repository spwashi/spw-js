import {SpwNode, SpwNodeKeyValue} from '../spwNode';

export class SpwComplexAnchorNode extends SpwNode {
    private _body?: SpwNode[];

    get body(): SpwNode[] | undefined {
        return this._body;
    }

    toJSON__internal(): any {
        return {...super.toJSON__internal(), body: this.body};
    }

    set(key: keyof this, value: SpwNodeKeyValue): this {
        switch (key) {
            case 'key':
                let nodes = this._getBodyFromRaw(value);
                this._key = nodes.map(n => n.key).join(' ');
                return this;
            case 'body': {
                this._body = this._getBodyFromRaw(value);
                this._body.forEach(node => node.setProp('parent', this))
                return this;
            }
        }
        super.set(key, value);
        return this;
    }

    private _getBodyFromRaw(value: string | number | SpwNode | SpwNodeKeyValue[]) {
        return (value as SpwNode[]).reduce((p: SpwNode[], c: SpwNode | SpwNode[]) => [...p, ...(Array.isArray(c) ? c : [c])], []);
    }
}