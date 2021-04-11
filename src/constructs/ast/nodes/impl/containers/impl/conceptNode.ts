import {ContainerNode} from '../abstract/container';

export class ConceptNode extends ContainerNode {
    static kind                = 'concept';
    static readonly openToken  = '<';
    static readonly closeToken = '>';
}