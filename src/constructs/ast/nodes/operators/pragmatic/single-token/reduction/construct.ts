import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { ReductionOperatorKind, ReductionOperatorToken } from './__types';

type StaticType = IConstructClass<ReductionOperatorKind> &
  ITokenOperatorClass<ReductionOperatorToken>;

@staticImplements<StaticType>()
export class ReductionOperator extends Operator<ReductionOperatorKind> {
  static kind: ReductionOperatorKind = 'reduction';

  static token: ReductionOperatorToken = '-';

  static components: ConstructComponents = operatorComponents(ReductionOperator);
}
