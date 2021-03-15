import {BoundaryNode, SpwBlockNode} from './helper/block/blockNode';


export class SpwConceptNode extends SpwBlockNode<SpwConceptNode> implements BoundaryNode {
    readonly keyCloser: string = '<';
    readonly keyOpener: string = '>';

}