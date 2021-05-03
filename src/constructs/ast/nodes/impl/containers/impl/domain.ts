import {ContainerNode} from '../abstract/container';

export class Domain extends ContainerNode<'domain'> {
    static kind                = 'domain'
    static readonly openToken  = '{';
    static readonly closeToken = '}';
}