import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type BranchToken = '|';

@staticImplements<ISpwItemStatic<'branch'> & IAtomicSpwOperatorStatic<'|'>>()
export class BranchOperator extends SpwOperator<'branch', '|'> {
    static kind: 'branch'     = 'branch';
    static token: BranchToken = '|';
}