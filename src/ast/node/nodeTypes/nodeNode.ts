import {SpwNode, SpwNodeKeyValue} from '../spwNode';

export class SpwNodeNode extends SpwNode {
    protected _node?: SpwNode;

    get node() {
        return this._node;
    }

    protected _essence?: SpwNode;

    get essence() {
        return this._essence;
    }

    protected _description?: SpwNode;

    get description() {
        return this._description;
    }

    set(key: keyof this, value: SpwNodeKeyValue): this {
        switch (key) {
            case 'key':
                break
            case 'node':
                this._node = (value as SpwNode);
                this.setProp('parent', this)
                return this;
            case 'essence':
                this._essence = (value as SpwNode);
                this.setProp('nodes', this._essence.getProp('nodes'));
                return this;
            case 'description':
                this._description = (value as SpwNode);
                return this;
        }
        this.linkComponents(key);
        super.set(key, value);
        return this;
    }

    private linkComponents(key: keyof this) {
        if (this._node && this._essence) {
            this._node.setProp('essence', this._essence);
            this._node.setProp('#', this._essence);
            this._essence.setProp('.[', this._node);
            this._essence.setProp('owner', this._node);
        }
        if (this._essence) {
            this._essence.setProp('parent', this);
        }
        if (this._description) {
            this._description.setProp('parent', this)
        }
        if (this._node && this._description) {
            this._description.setProp('owner', this._node)
            this._node.setProp('description', this._description);
            this._node.setProp('##', this._description);
        }
    }
}