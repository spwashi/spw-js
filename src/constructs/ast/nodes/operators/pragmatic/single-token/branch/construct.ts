import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { BranchOperatorKind, BranchOperatorToken } from './__types';

type StaticType = IConstructClass<BranchOperatorKind> & ITokenOperatorClass<BranchOperatorToken>;

@staticImplements<StaticType>()
export class BranchOperator extends Operator<BranchOperatorKind> {
  static kind: BranchOperatorKind = 'branch';

  static token: BranchOperatorToken = '|';

  static components: ConstructComponents = operatorComponents(BranchOperator);
}
