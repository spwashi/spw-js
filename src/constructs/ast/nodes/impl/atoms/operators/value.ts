import {staticImplements} from '@constructs/ast/util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/impl/atoms/operators/abstract/types/atomic';
import SpwOperator from '@constructs/ast/nodes/impl/atoms/operators/abstract/operator';

type ValueToken = '*';

@staticImplements<ISpwItemStatic<'value'> & IAtomicSpwOperatorStatic<'*'>>()
export class ValueOperator extends SpwOperator<'value', '*'> {
    static kind: 'value'     = 'value';
    static token: ValueToken = '*';
}