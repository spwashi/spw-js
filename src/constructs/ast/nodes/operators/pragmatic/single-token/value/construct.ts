import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { ValueOperatorKind, ValueOperatorToken } from './__types';

type StaticType = IConstructClass<ValueOperatorKind> & ITokenOperatorClass<ValueOperatorToken>;

@staticImplements<StaticType>()
export class ValueOperator extends Operator<ValueOperatorKind> {
  static kind: ValueOperatorKind = 'value_operator';

  static token: ValueOperatorToken = '*';

  static components: ConstructComponents = operatorComponents(ValueOperator);
}
