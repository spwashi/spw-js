import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { RelationOperatorKind, RelationOperatorToken } from './__types';

type StaticType = IConstructClass<RelationOperatorKind> &
  ITokenOperatorClass<RelationOperatorToken>;

@staticImplements<StaticType>()
export class RelationOperator extends Operator<RelationOperatorKind> {
  static kind: RelationOperatorKind = 'relation';

  static token: RelationOperatorToken = '=';

  static components: ConstructComponents = operatorComponents(RelationOperator);
}
