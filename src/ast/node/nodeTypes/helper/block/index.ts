import {SpwNode, SpwNodeKeyValue} from '../../../spwNode';

export interface BoundaryNode {
    objective: SpwNode | undefined;
    subjective: SpwNode | undefined;
}

export class SpwBlockNode extends SpwNode {
    protected _body?: Set<SpwNode> = new Set<SpwNode>();

    get body() {
        return this._body;
    }

    private _objective?: SpwNode | undefined;

    get objective() {
        return this._objective;
    }

    private _subjective?: SpwNode | undefined;

    get subjective() {
        return this._subjective;
    }

    set(key: keyof this | 'objective_anchor' | 'subjective_anchor', value: SpwNodeKeyValue): this {
        switch (key) {
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
                this._body = new Set<SpwNode>(value as Array<SpwNode>);
                this._body.forEach(node => node.setProp('parent', this))
                return this;
        }
        super.set(key, value);

        this.setProp('nodes', Array.from(this._body ?? []));

        return this;
    }

}