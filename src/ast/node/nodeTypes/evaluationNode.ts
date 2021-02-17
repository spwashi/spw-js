import {SpwNode, SpwNodeKeyValue} from '../spwNode';

export class SpwEvaluationNode extends SpwNode {
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
                return this;
        }
        super.set(key, value);
        return this;
    }

}