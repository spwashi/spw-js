import Operator, { operatorComponents } from '../_abstract/operator';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ITokenOperatorClass } from '../_abstract/_types/atomic';
import {
  PerformanceOperatorKind,
  PerformanceOperatorToken,
} from '@constructs/ast/nodes/atoms/operators/performance/__types';

@staticImplements<IConstructClass<'performance'> & ITokenOperatorClass<'!'>>()
export class PerformanceOperator extends Operator<PerformanceOperatorKind> {
  static readonly kind: PerformanceOperatorKind = 'performance';

  static readonly token: PerformanceOperatorToken = '!';

  static components: ConstructComponents = operatorComponents(PerformanceOperator);
}
