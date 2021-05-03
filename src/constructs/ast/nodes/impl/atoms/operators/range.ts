import {staticImplements} from '@constructs/ast/util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/impl/atoms/operators/abstract/types/atomic';
import SpwOperator from '@constructs/ast/nodes/impl/atoms/operators/abstract/operator';

type RangeToken = '..';

@staticImplements<ISpwItemStatic<'range'> & IAtomicSpwOperatorStatic<'..'>>()
export class RangeOperator extends SpwOperator<'range', '..'> {
    static kind: 'range'     = 'range';
    static token: RangeToken = '..';
}