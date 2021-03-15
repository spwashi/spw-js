import {SpwNode} from '../../../ast/node/spwNode';

export interface ISpwContainerNode<T extends ISpwContainerNode<any>, E extends ISpwContainerNode<any> = T> extends SpwNode {
    readonly entries: (ISpwNodeEntry<E>)[];
}

interface ISpwNodeEntry<T extends ISpwContainerNode<any> = ISpwContainerNode<any>> {
    container: T;
    index?: number
}

export {ISpwNodeEntry};