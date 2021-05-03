import {SpwItemKind} from '@constructs/ast/types/kind';
import {SpwItem} from '@constructs/ast/abstract/item';
import {SpwItemJunction} from '@constructs/ast/abstract/types';

export class SpwNode<Kind extends SpwItemKind, Junction extends SpwItemJunction = SpwItemJunction> extends SpwItem<Kind, Junction> {


}