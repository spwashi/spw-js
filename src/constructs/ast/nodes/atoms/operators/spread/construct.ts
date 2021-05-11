import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type SpreadToken = '...';

@staticImplements<ISpwItemStatic<'spread'> & IAtomicSpwOperatorStatic<'...'>>()
export class SpreadOperator extends SpwOperator<'spread', '...'> {
    static kind: 'spread'     = 'spread';
    static token: SpreadToken = '...';
}