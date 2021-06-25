import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import Operator, {
  operatorComponents,
} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';
import {
  SpreadOperatorKind,
  SpreadOperatorToken,
} from '@constructs/ast/nodes/atoms/operators/spread/__types';

type StaticType = IConstructClass<SpreadOperatorKind> & ITokenOperatorClass<'...'>;

@staticImplements<StaticType>()
export class SpreadOperator extends Operator<SpreadOperatorKind> {
  static kind: SpreadOperatorKind = 'spread';

  static token: SpreadOperatorToken = '...';

  static components: ConstructComponents = operatorComponents(SpreadOperator);
}
