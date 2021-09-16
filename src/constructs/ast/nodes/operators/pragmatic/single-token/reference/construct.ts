import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { ReferenceOperatorKind, ReferenceOperatorToken } from './__types';

type StaticType = IConstructClass<ReferenceOperatorKind> &
  ITokenOperatorClass<ReferenceOperatorToken>;

@staticImplements<StaticType>()
export class ReferenceOperator extends Operator<ReferenceOperatorKind> {
  static kind: ReferenceOperatorKind = 'reference';

  static token: ReferenceOperatorToken = '&';

  static components: ConstructComponents = operatorComponents(ReferenceOperator);
}
