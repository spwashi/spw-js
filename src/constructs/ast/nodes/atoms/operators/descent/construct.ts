import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type DescentToken = '.';

@staticImplements<ISpwItemStatic<'descent'> & IAtomicSpwOperatorStatic<'.'>>()
export class DescentOperator extends SpwOperator<'descent', '.'> {
    static kind: 'descent'     = 'descent';
    static token: DescentToken = '.';
}