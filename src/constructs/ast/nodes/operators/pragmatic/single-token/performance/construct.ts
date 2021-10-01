import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { PerformanceOperatorKind, PerformanceOperatorToken } from './__types';

@staticImplements<IConstructClass<'performance_operator'> & ITokenOperatorClass<'!'>>()
export class PerformanceOperator extends Operator<PerformanceOperatorKind> {
  static readonly kind: PerformanceOperatorKind = 'performance_operator';

  static readonly token: PerformanceOperatorToken = '!';

  static components: ConstructComponents = operatorComponents(PerformanceOperator);
}
