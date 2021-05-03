import {ContainerNode} from '../abstract/container';

export class Concept extends ContainerNode<'concept'> {
    static kind                = 'concept';
    static readonly openToken  = '<';
    static readonly closeToken = '>';
}