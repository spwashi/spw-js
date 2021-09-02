import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { ConvergenceOperatorKind, ConvergenceOperatorToken } from './__types';

@staticImplements<IConstructClass<ConvergenceOperatorKind> & ITokenOperatorClass<'>'>>()
export class ConvergenceOperator extends Operator<ConvergenceOperatorKind> {
  static kind: ConvergenceOperatorKind = 'convergence';

  static token: ConvergenceOperatorToken = '>';

  static components: ConstructComponents = operatorComponents(ConvergenceOperator);
}
