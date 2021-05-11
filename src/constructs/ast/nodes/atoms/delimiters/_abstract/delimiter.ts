import {SpwShape} from '@constructs/ast/_abstract/types';
import {SpwItemKind} from '@constructs/ast/_types/kind';
import SpwOperator from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

export class SpwDelimiter<Kind extends SpwItemKind = SpwShape, T extends string = SpwShape> extends SpwOperator<Kind, T> {
    static token = 'unknown';
}