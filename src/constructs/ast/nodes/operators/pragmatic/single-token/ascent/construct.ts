import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { AscentOperatorKind, AscentOperatorToken } from './__types';

type StaticType = IConstructClass<AscentOperatorKind> & ITokenOperatorClass<AscentOperatorToken>;

@staticImplements<StaticType>()
export class AscentOperator extends Operator<AscentOperatorKind> {
  static kind: AscentOperatorKind = 'ascent';

  static token: AscentOperatorToken = '^';

  static components: ConstructComponents = operatorComponents(AscentOperator);
}
