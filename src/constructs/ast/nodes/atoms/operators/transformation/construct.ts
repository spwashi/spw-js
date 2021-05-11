import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type TransformationToken = '=>';

@staticImplements<ISpwItemStatic<'transformation'> & IAtomicSpwOperatorStatic<'=>'>>()
export class TransformationOperator extends SpwOperator<'transformation', '=>'> {
    static kind: 'transformation'     = 'transformation';
    static token: TransformationToken = '=>';
}