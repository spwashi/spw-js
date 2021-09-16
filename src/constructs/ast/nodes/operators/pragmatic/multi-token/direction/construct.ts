import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { DirectionOperatorKind, DirectionOperatorToken } from './__types';

type StaticType = IConstructClass<DirectionOperatorKind> &
  ITokenOperatorClass<DirectionOperatorToken>;

@staticImplements<StaticType>()
export class DirectionOperator extends Operator<DirectionOperatorKind> {
  static kind: DirectionOperatorKind = 'direction';

  static token: DirectionOperatorToken = '.-';

  static components: ConstructComponents = operatorComponents(DirectionOperator);
}
