import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import Operator, {
  operatorComponents,
} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';
import {
  DirectionOperatorKind,
  DirectionOperatorToken,
} from '@constructs/ast/nodes/atoms/operators/direction/__types';

type StaticType = IConstructClass<DirectionOperatorKind> &
  ITokenOperatorClass<DirectionOperatorToken>;

@staticImplements<StaticType>()
export class DirectionOperator extends Operator<DirectionOperatorKind> {
  static kind: DirectionOperatorKind = 'direction';

  static token: DirectionOperatorToken = '->';

  static components: ConstructComponents = operatorComponents(DirectionOperator);
}
