import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { EvaluationOperatorKind, EvaluationOperatorToken } from './__types';

@staticImplements<IConstructClass<'evaluation'> & ITokenOperatorClass<'?'>>()
export class EvaluationOperator extends Operator<EvaluationOperatorKind> {
  static readonly kind: EvaluationOperatorKind = 'evaluation';

  static readonly token: EvaluationOperatorToken = '?';

  static components: ConstructComponents = operatorComponents(EvaluationOperator);
}
