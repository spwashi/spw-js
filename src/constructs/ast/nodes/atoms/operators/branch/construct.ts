import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  ISpwConstructStatic,
  ConstructComponents,
} from '../../../../_abstract/construct';
import { IAtomicSpwOperatorStatic } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator, {
  operatorComponents,
} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type BranchToken = '|';

@staticImplements<
  ISpwConstructStatic<'branch'> & IAtomicSpwOperatorStatic<'|'>
>()
export class BranchOperator extends SpwOperator<'branch'> {
  static kind: 'branch' = 'branch';

  static token: BranchToken = '|';

  static components: ConstructComponents = operatorComponents(BranchOperator);
}
