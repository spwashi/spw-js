import {ContainerNode} from '../abstract/container';

export class DomainContainer extends ContainerNode<'domain'> {
    static kind                = 'domain'
    static readonly openToken  = '{';
    static readonly closeToken = '}';
}