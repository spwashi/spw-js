import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type ReferenceToken = '&';

@staticImplements<ISpwItemStatic<'reference'> & IAtomicSpwOperatorStatic<'&'>>()
export class ReferenceOperator extends SpwOperator<'reference'> {
    static kind: 'reference' = 'reference';

    static token: ReferenceToken = '&';
}