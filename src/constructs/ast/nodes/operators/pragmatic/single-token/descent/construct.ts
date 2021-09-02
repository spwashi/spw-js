import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { DescentOperatorKind, DescentOperatorToken } from './__types';

type StaticType = IConstructClass<DescentOperatorKind> & ITokenOperatorClass<DescentOperatorToken>;

@staticImplements<StaticType>()
export class DescentOperator extends Operator<'descent'> {
  static kind: DescentOperatorKind = 'descent';

  static token: DescentOperatorToken = '.';

  static components: ConstructComponents = operatorComponents(DescentOperator);
}
