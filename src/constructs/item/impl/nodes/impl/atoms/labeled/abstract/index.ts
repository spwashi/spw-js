import {SpwNode} from '../../../../abstract/node';

export interface CanHaveLabel {
    label: SpwNode | undefined;
}

export default abstract class LabeledAtomNode extends SpwNode implements CanHaveLabel {
    protected static token: string | undefined = undefined;
    #label?: SpwNode;
    #token?: string;

    get label() {
        return this.#label;
    }

    get token() { return this.#token ?? Object.getPrototypeOf(this).token; }
}