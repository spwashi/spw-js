import {ContainerNode} from '../abstract/container';

export class EssentialContainer extends ContainerNode<'essence'> {
    static kind                = 'essence';
    static readonly openToken  = '[';
    static readonly closeToken = ']';
}