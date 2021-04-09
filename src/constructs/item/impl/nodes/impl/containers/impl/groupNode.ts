import {ContainerNode} from '../abstract/container';

export class GroupNode extends ContainerNode {
    static kind                = 'group';
    static readonly openToken  = '(';
    static readonly closeToken = ')';
}