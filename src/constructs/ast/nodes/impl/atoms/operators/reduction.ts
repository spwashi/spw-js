import {staticImplements} from '@constructs/ast/util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/impl/atoms/operators/abstract/types/atomic';
import SpwOperator from '@constructs/ast/nodes/impl/atoms/operators/abstract/operator';

type ReductionToken = '-';

@staticImplements<ISpwItemStatic<'reduction'> & IAtomicSpwOperatorStatic<'-'>>()
export class ReductionOperator extends SpwOperator<'reduction', '-'> {
    static kind: 'reduction'     = 'reduction';
    static token: ReductionToken = '-';
}