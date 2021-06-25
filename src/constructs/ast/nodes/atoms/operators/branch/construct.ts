import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import Operator, {
  operatorComponents,
} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';
import {
  BranchOperatorKind,
  BranchOperatorToken,
} from '@constructs/ast/nodes/atoms/operators/branch/__types';

type StaticType = IConstructClass<BranchOperatorKind> & ITokenOperatorClass<BranchOperatorToken>;

@staticImplements<StaticType>()
export class BranchOperator extends Operator<BranchOperatorKind> {
  static kind: BranchOperatorKind = 'branch';

  static token: BranchOperatorToken = '|';

  static components: ConstructComponents = operatorComponents(BranchOperator);
}
