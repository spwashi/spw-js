import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import Operator, {
  operatorComponents,
} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';
import {
  RangeOperatorKind,
  RangeOperatorToken,
} from '@constructs/ast/nodes/atoms/operators/range/__types';

type StaticType = IConstructClass<RangeOperatorKind> & ITokenOperatorClass<RangeOperatorToken>;

@staticImplements<StaticType>()
export class RangeOperator extends Operator<RangeOperatorKind> {
  static kind: RangeOperatorKind = 'range';

  static token: RangeOperatorToken = '..';

  static components: ConstructComponents = operatorComponents(RangeOperator);
}
