import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import Operator, {
  operatorComponents,
} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';
import {
  ReferenceOperatorKind,
  ReferenceOperatorToken,
} from '@constructs/ast/nodes/atoms/operators/reference/__types';

type StaticType = IConstructClass<ReferenceOperatorKind> &
  ITokenOperatorClass<ReferenceOperatorToken>;

@staticImplements<StaticType>()
export class ReferenceOperator extends Operator<ReferenceOperatorKind> {
  static kind: ReferenceOperatorKind = 'reference';

  static token: ReferenceOperatorToken = '&';

  static components: ConstructComponents = operatorComponents(ReferenceOperator);
}
