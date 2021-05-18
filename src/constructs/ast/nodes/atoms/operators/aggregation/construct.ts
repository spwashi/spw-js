import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type AggregationToken = '+';

@staticImplements<ISpwItemStatic<'aggregation'> & IAtomicSpwOperatorStatic<'+'>>()
export class AggregationOperator extends SpwOperator<'aggregation'> {
    static kind: 'aggregation'     = 'aggregation';

    static token: AggregationToken = '+';
}