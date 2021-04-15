import {ContainerNode} from '../abstract/container';

export class ConceptualContainer extends ContainerNode<'concept'> {
    static kind                = 'concept';
    static readonly openToken  = '<';
    static readonly closeToken = '>';
}