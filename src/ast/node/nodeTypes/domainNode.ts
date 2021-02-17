import {SpwNodeKeyValue} from '../spwNode';
import {SpwBlockNode} from './helper/block';

export class SpwDomainNode extends SpwBlockNode {
    get body() {
        return this._body;
    }

    set(key: keyof this, value: SpwNodeKeyValue): this {
        super.set(key, value);

        // assuming: `this._body` exists as a result of the parent setter
        switch (key) {
            case 'body':
                if (!this._body) break;

                this._body.forEach(node => node.setProp('domain', this))
                return this;
        }
        return this;
    }

}