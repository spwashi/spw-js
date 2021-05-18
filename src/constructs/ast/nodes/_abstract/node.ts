import {SpwItemKind} from '@constructs/ast/_types/kind';
import {SpwConstruct} from '@constructs/ast/_abstract/spwConstruct';
import {SpwShape} from '@constructs/ast/_abstract/types';

export class SpwNode<Kind extends SpwItemKind = SpwShape, Item extends SpwShape = SpwShape> extends SpwConstruct<Kind, Item> {


}