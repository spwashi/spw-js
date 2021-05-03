import {staticImplements} from '@constructs/ast/util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/impl/atoms/operators/abstract/types/atomic';
import SpwOperator from '@constructs/ast/nodes/impl/atoms/operators/abstract/operator';

type AscentToken = '^';

@staticImplements<ISpwItemStatic<'ascent'> & IAtomicSpwOperatorStatic<'^'>>()
export class AscentOperator extends SpwOperator<'ascent', '^'> {
    static kind: 'ascent'     = 'ascent';
    static token: AscentToken = '^';
}