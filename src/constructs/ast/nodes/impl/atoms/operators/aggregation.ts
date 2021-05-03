import {staticImplements} from '@constructs/ast/util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/impl/atoms/operators/abstract/types/atomic';
import SpwOperator from '@constructs/ast/nodes/impl/atoms/operators/abstract/operator';

type AggregationToken = '+';

@staticImplements<ISpwItemStatic<'aggregation'> & IAtomicSpwOperatorStatic<'+'>>()
export class AggregationOperator extends SpwOperator<'aggregation', '+'> {
    static kind: 'aggregation'     = 'aggregation';
    static token: AggregationToken = '+';
}