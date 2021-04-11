import {ContainerNode} from '../abstract/container';

export class DomainNode extends ContainerNode {
    static kind                = 'domain'
    static readonly openToken  = '{';
    static readonly closeToken = '}';
}