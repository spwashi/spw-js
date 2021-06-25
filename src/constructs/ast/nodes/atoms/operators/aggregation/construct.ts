import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import Operator, {
  operatorComponents,
} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';
import {
  AggregationOperatorKind,
  AggregationOperatorToken,
} from '@constructs/ast/nodes/atoms/operators/aggregation/__types';

@staticImplements<IConstructClass<AggregationOperatorKind> & ITokenOperatorClass<'+'>>()
export class AggregationOperator extends Operator<AggregationOperatorKind> {
  static kind: AggregationOperatorKind = 'aggregation';

  static token: AggregationOperatorToken = '+';

  static components: ConstructComponents = operatorComponents(AggregationOperator);
}
