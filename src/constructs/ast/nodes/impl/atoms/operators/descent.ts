import {staticImplements} from '@constructs/ast/util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/impl/atoms/operators/abstract/types/atomic';
import SpwOperator from '@constructs/ast/nodes/impl/atoms/operators/abstract/operator';

type DescentToken = '.';

@staticImplements<ISpwItemStatic<'descent'> & IAtomicSpwOperatorStatic<'.'>>()
export class DescentOperator extends SpwOperator<'descent', '.'> {
    static kind: 'descent'     = 'descent';
    static token: DescentToken = '.';
}