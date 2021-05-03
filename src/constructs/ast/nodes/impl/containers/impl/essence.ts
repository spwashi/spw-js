import {ContainerNode} from '../abstract/container';

export class Essence extends ContainerNode<'essence'> {
    static kind                = 'essence';
    static readonly openToken  = '[';
    static readonly closeToken = ']';
}