import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type RangeToken = '..';

@staticImplements<ISpwItemStatic<'range'> & IAtomicSpwOperatorStatic<'..'>>()
export class RangeOperator extends SpwOperator<'range', '..'> {
    static kind: 'range'     = 'range';
    static token: RangeToken = '..';
}