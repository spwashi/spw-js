import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type ValueToken = '*';

@staticImplements<ISpwItemStatic<'value'> & IAtomicSpwOperatorStatic<'*'>>()
export class ValueOperator extends SpwOperator<'value'> {
    static kind: 'value'     = 'value';

    static token: ValueToken = '*';
}