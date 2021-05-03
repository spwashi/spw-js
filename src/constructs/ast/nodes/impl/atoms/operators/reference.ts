import {staticImplements} from '@constructs/ast/util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/impl/atoms/operators/abstract/types/atomic';
import SpwOperator from '@constructs/ast/nodes/impl/atoms/operators/abstract/operator';

type ReferenceToken = '&';

@staticImplements<ISpwItemStatic<'reference'> & IAtomicSpwOperatorStatic<'&'>>()
export class ReferenceOperator extends SpwOperator<'reference', '&'> {
    static kind: 'reference'     = 'reference';
    static token: ReferenceToken = '&';
}