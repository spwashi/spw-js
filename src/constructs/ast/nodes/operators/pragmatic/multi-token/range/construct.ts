import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { RangeOperatorKind, RangeOperatorToken } from './__types';

type StaticType = IConstructClass<RangeOperatorKind> & ITokenOperatorClass<RangeOperatorToken>;

@staticImplements<StaticType>()
export class RangeOperator extends Operator<RangeOperatorKind> {
  static kind: RangeOperatorKind = 'range_operator';

  static token: RangeOperatorToken = '..';

  static components: ConstructComponents = operatorComponents(RangeOperator);
}
