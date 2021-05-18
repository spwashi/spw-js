import {SpwItemKind} from '../../_types/kind';
import {SpwConstruct} from '../../_abstract/construct';
import {SpwItemJunction} from '@constructs/ast/_abstract/types';

export abstract class SpwExpression<Kind extends SpwItemKind, Junction extends SpwItemJunction = SpwItemJunction> extends SpwConstruct<Kind, Junction> {

}