import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import Operator, {
  operatorComponents,
} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';
import {
  ReductionOperatorKind,
  ReductionOperatorToken,
} from '@constructs/ast/nodes/atoms/operators/reduction/__types';

type StaticType = IConstructClass<ReductionOperatorKind> &
  ITokenOperatorClass<ReductionOperatorToken>;

@staticImplements<StaticType>()
export class ReductionOperator extends Operator<ReductionOperatorKind> {
  static kind: ReductionOperatorKind = 'reduction';

  static token: ReductionOperatorToken = '-';

  static components: ConstructComponents = operatorComponents(ReductionOperator);
}
