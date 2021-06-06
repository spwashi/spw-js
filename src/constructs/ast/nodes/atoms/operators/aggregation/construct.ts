import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  ISpwConstructStatic,
  ConstructComponents,
} from '../../../../_abstract/construct';
import { IAtomicSpwOperatorStatic } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator, {
  operatorComponents,
} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type AggregationToken = '+';

@staticImplements<
  ISpwConstructStatic<'aggregation'> & IAtomicSpwOperatorStatic<'+'>
>()
export class AggregationOperator extends SpwOperator<'aggregation'> {
  static kind: 'aggregation' = 'aggregation';

  static token: AggregationToken = '+';

  static components: ConstructComponents =
    operatorComponents(AggregationOperator);
}
