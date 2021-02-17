import {SpwNode, SpwNodeKeyValue} from '../spwNode';
import {setLabelledNodeItem} from './helper/labelled/types';

export class SpwChannelNode extends SpwNode {
    #_label?: SpwNode;

    get label() {
        return this.#_label;
    }

    set(key: keyof this, value: SpwNodeKeyValue): this {
        switch (key) {
            case 'key':
                this.setProp('nodes', []);
                break;
            case 'label':
                this.#_label = (value as SpwNode);
                setLabelledNodeItem(this);
                return this;
        }
        super.set(key, value);
        return this;
    }

}