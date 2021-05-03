import {ContainerNode} from '../abstract/container';

export class Group extends ContainerNode<'parenthetical'> {
    static kind                = 'parenthetical';
    static readonly openToken  = '(';
    static readonly closeToken = ')';
}