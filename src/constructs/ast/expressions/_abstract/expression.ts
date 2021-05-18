import {SpwItemKind} from '../../_types/kind';
import {SpwConstruct} from '../../_abstract/construct';
import {SpwShape} from '@constructs/ast/_abstract/types';

export abstract class SpwExpression<Kind extends SpwItemKind, U extends SpwShape = SpwShape> extends SpwConstruct<Kind, U> {

}