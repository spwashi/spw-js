import {staticImplements} from '@constructs/ast/util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/impl/atoms/operators/abstract/types/atomic';
import SpwOperator from '@constructs/ast/nodes/impl/atoms/operators/abstract/operator';

type BranchToken = '|';

@staticImplements<ISpwItemStatic<'branch'> & IAtomicSpwOperatorStatic<'|'>>()
export class BranchOperator extends SpwOperator<'branch', '|'> {
    static kind: 'branch'     = 'branch';
    static token: BranchToken = '|';
}