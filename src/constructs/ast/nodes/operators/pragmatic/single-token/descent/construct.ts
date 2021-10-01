import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { DescentOperatorKind, DescentOperatorToken } from './__types';

type StaticType = IConstructClass<DescentOperatorKind> & ITokenOperatorClass<DescentOperatorToken>;

@staticImplements<StaticType>()
export class DescentOperator extends Operator<'descent_operator'> {
  static kind: DescentOperatorKind = 'descent_operator';

  static token: DescentOperatorToken = '.';

  static components: ConstructComponents = operatorComponents(DescentOperator);
}
