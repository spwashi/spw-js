import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type AscentToken = '^';

@staticImplements<ISpwItemStatic<'ascent'> & IAtomicSpwOperatorStatic<'^'>>()
export class AscentOperator extends SpwOperator<'ascent'> {
    static kind: 'ascent'     = 'ascent';
    static token: AscentToken = '^';
}