import {SpwItemKind} from '@constructs/ast/_types/kind';
import {SpwItem} from '@constructs/ast/_abstract/item';
import {SpwShape} from '@constructs/ast/_abstract/types';

export class SpwNode<Kind extends SpwItemKind = SpwShape, Item extends SpwShape = SpwShape> extends SpwItem<Kind, Item> {


}