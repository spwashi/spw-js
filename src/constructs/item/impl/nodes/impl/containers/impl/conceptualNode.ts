import {ContainerNode} from '../abstract/container';

export class ConceptualNode extends ContainerNode {
    static kind                = 'concept';
    static readonly openToken  = '<';
    static readonly closeToken = '>';
}