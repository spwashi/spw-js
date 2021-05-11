import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type ReductionToken = '-';

@staticImplements<ISpwItemStatic<'reduction'> & IAtomicSpwOperatorStatic<'-'>>()
export class ReductionOperator extends SpwOperator<'reduction', '-'> {
    static kind: 'reduction'     = 'reduction';
    static token: ReductionToken = '-';
}