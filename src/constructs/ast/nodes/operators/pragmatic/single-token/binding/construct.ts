import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { BindingOperatorKind, BindingOperatorToken } from './__types';

type StaticType = IConstructClass<BindingOperatorKind> & ITokenOperatorClass<BindingOperatorToken>;

@staticImplements<StaticType>()
export class BindingOperator extends Operator<BindingOperatorKind> {
  static kind: BindingOperatorKind = 'binding';

  static token: BindingOperatorToken = ':';

  static components: ConstructComponents = operatorComponents(BindingOperator);
}
