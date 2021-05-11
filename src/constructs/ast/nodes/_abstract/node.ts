import {SpwItemKind} from '@constructs/ast/_types/kind';
import {SpwItem} from '@constructs/ast/_abstract/item';
import {SpwItemJunction, SpwShape} from '@constructs/ast/_abstract/types';

export class SpwNode<Kind extends SpwItemKind = SpwShape, Junction extends SpwItemJunction = SpwItemJunction> extends SpwItem<Kind, Junction> {


}