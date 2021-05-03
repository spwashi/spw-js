import {staticImplements} from '@constructs/ast/util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/impl/atoms/operators/abstract/types/atomic';
import SpwOperator from '@constructs/ast/nodes/impl/atoms/operators/abstract/operator';

type DirectionToken = '->';

@staticImplements<ISpwItemStatic<'direction'> & IAtomicSpwOperatorStatic<'->'>>()
export class DirectionOperator extends SpwOperator<'direction', '->'> {
    static kind: 'direction'     = 'direction';
    static token: DirectionToken = '->';
}