import {SpwNode} from '../../../../abstract/node';

export default abstract class LabeledAtomNode extends SpwNode {
    protected static token: string | undefined = undefined;
    #token?: string;
    get token(): string | undefined { return this.#token ?? Object.getPrototypeOf(this).token; }
}