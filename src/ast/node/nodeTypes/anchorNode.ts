import {SpwNode, SpwNodeKeyValue} from '../spwNode';

export class SpwAnchorNode extends SpwNode {
    get key(): string {
        let key = super.key;
        if (!key) return '&';
        return key;
    }

    set(key: keyof this, value: SpwNodeKeyValue): this {
        super.set(key, value);
        switch (key) {
            case 'key':
                this.setProp('nodes', []);
                break;
        }
        return this;
    }
}