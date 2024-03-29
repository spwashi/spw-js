import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { SpreadOperatorKind, SpreadOperatorToken } from './__types';

type StaticType = IConstructClass<SpreadOperatorKind> & ITokenOperatorClass<'...'>;

@staticImplements<StaticType>()
export class SpreadOperator extends Operator<SpreadOperatorKind> {
  static kind: SpreadOperatorKind = 'spread_operator';

  static token: SpreadOperatorToken = '...';

  static components: ConstructComponents = operatorComponents(SpreadOperator);
}
