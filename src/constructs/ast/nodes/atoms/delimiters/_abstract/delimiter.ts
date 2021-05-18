import {SpwShape} from '@constructs/ast/_abstract/types';
import {SpwItemKind} from '@constructs/ast/_types/kind';
import SpwOperator from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

export class SpwDelimiter<Kind extends SpwItemKind = SpwShape> extends SpwOperator<Kind> {
    static token = 'unknown';
}