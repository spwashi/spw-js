import {ContainerNode} from '../abstract/container';

export class ParentheticalContainer extends ContainerNode<'parenthetical'> {
    static kind                = 'parenthetical';
    static readonly openToken  = '(';
    static readonly closeToken = ')';
}