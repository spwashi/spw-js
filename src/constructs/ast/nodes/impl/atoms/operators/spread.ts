import {staticImplements} from '@constructs/ast/util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/impl/atoms/operators/abstract/types/atomic';
import SpwOperator from '@constructs/ast/nodes/impl/atoms/operators/abstract/operator';

type SpreadToken = '...';

@staticImplements<ISpwItemStatic<'spread'> & IAtomicSpwOperatorStatic<'...'>>()
export class SpreadOperator extends SpwOperator<'spread', '...'> {
    static kind: 'spread'     = 'spread';
    static token: SpreadToken = '...';
}