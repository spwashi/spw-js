import {staticImplements} from '@constructs/ast/util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/impl/atoms/operators/abstract/types/atomic';
import SpwOperator from '@constructs/ast/nodes/impl/atoms/operators/abstract/operator';

type TransformationToken = '=>';

@staticImplements<ISpwItemStatic<'transformation'> & IAtomicSpwOperatorStatic<'=>'>>()
export class TransformationOperator extends SpwOperator<'transformation', '=>'> {
    static kind: 'transformation'     = 'transformation';
    static token: TransformationToken = '=>';
}