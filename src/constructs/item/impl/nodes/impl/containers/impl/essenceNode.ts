import {ContainerNode} from '../abstract/container';

export class EssentialNode extends ContainerNode {
    static kind                = 'essence';
    static readonly openToken  = '[';
    static readonly closeToken = ']';
}