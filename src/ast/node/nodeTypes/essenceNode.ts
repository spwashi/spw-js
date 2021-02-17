import {SpwNodeKeyValue} from '../spwNode';
import {SpwBlockNode} from './helper/block';

export class SpwEssenceNode extends SpwBlockNode {
    set(key: keyof this, value: SpwNodeKeyValue): this {
        super.set(key, value);

        // assume this._body exists as a result of the parent call
        switch (key) {
            case 'body':
                if (!this._body) break;

                this._body.forEach(node => node.setProp('parent', this))
                return this;
        }
        return this;
    }

}