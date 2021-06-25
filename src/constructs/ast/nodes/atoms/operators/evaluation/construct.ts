import Operator, { operatorComponents } from '../_abstract/operator';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ITokenOperatorClass } from '../_abstract/_types/atomic';
import {
  EvaluationOperatorKind,
  EvaluationOperatorToken,
} from '@constructs/ast/nodes/atoms/operators/evaluation/__types';

@staticImplements<IConstructClass<'evaluation'> & ITokenOperatorClass<'?'>>()
export class EvaluationOperator extends Operator<EvaluationOperatorKind> {
  static readonly kind: EvaluationOperatorKind = 'evaluation';

  static readonly token: EvaluationOperatorToken = '?';

  static components: ConstructComponents = operatorComponents(EvaluationOperator);
}
