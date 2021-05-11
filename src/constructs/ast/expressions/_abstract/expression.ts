import {SpwItemKind} from '../../_types/kind';
import {SpwItem} from '../../_abstract/item';
import {SpwItemJunction} from '@constructs/ast/_abstract/types';

export abstract class SpwExpression<Kind extends SpwItemKind, Junction extends SpwItemJunction = SpwItemJunction> extends SpwItem<Kind, Junction> {

}