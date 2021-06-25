import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import Operator, {
  operatorComponents,
} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';
import {
  ValueOperatorKind,
  ValueOperatorToken,
} from '@constructs/ast/nodes/atoms/operators/value/__types';

type StaticType = IConstructClass<ValueOperatorKind> & ITokenOperatorClass<ValueOperatorToken>;

@staticImplements<StaticType>()
export class ValueOperator extends Operator<ValueOperatorKind> {
  static kind: ValueOperatorKind = 'value';

  static token: ValueOperatorToken = '*';

  static components: ConstructComponents = operatorComponents(ValueOperator);
}
