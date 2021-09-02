import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { PerformanceOperatorKind, PerformanceOperatorToken } from './__types';
import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';

@staticImplements<IConstructClass<'performance'> & ITokenOperatorClass<'!'>>()
export class PerformanceOperator extends Operator<PerformanceOperatorKind> {
  static readonly kind: PerformanceOperatorKind = 'performance';

  static readonly token: PerformanceOperatorToken = '!';

  static components: ConstructComponents = operatorComponents(PerformanceOperator);
}
