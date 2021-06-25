import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import Operator, {
  operatorComponents,
} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';
import {
  AscentOperatorKind,
  AscentOperatorToken,
} from '@constructs/ast/nodes/atoms/operators/ascent/__types';

type StaticType = IConstructClass<AscentOperatorKind> & ITokenOperatorClass<AscentOperatorToken>;

@staticImplements<StaticType>()
export class AscentOperator extends Operator<AscentOperatorKind> {
  static kind: AscentOperatorKind = 'ascent';

  static token: AscentOperatorToken = '^';

  static components: ConstructComponents = operatorComponents(AscentOperator);
}
