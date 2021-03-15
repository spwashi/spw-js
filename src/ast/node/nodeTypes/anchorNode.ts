import {SpwNode, SpwNodeKeyValue} from '../spwNode';

export class SpwAnchorNode extends SpwNode {
    get key(): string {
        let key = super.key;
        if (!key) return '&';
        return key;
    }

    set(key: keyof this, value: SpwNodeKeyValue): this {
        switch (key) {
            case 'key':
                this.setProp('nodes', []);
                this._key = value as string;
                return this;
        }
        return super.set(key, value);
    }
}