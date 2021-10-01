import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Operator, operatorComponents } from '../../../_abstract/operator';
import { AggregationOperatorKind, AggregationOperatorToken } from './__types';

type StaticType = IConstructClass<AggregationOperatorKind> &
  ITokenOperatorClass<AggregationOperatorToken>;

@staticImplements<StaticType>()
export class AggregationOperator extends Operator<AggregationOperatorKind> {
  static kind: AggregationOperatorKind = 'aggregation_operator';

  static token: AggregationOperatorToken = '+';

  static components: ConstructComponents = operatorComponents(AggregationOperator);
}
