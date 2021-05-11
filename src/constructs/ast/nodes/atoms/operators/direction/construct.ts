import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type DirectionToken = '->';

@staticImplements<ISpwItemStatic<'direction'> & IAtomicSpwOperatorStatic<'->'>>()
export class DirectionOperator extends SpwOperator<'direction', '->'> {
    static kind: 'direction'     = 'direction';
    static token: DirectionToken = '->';
}