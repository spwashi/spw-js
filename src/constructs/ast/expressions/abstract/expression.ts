import {SpwItemKind} from '../../types/kind';
import {SpwItem} from '../../abstract/item';
import {SpwItemJunction} from '@constructs/ast/abstract/types';

export abstract class SpwExpression<Kind extends SpwItemKind, Junction extends SpwItemJunction = SpwItemJunction> extends SpwItem<Kind, Junction> {

}