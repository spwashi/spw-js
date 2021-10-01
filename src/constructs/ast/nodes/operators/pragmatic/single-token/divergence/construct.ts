import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { DivergenceOperatorKind, DivergenceOperatorToken } from './__types';

@staticImplements<IConstructClass<DivergenceOperatorKind> & ITokenOperatorClass<'<'>>()
export class DivergenceOperator extends Operator<DivergenceOperatorKind> {
  static kind: DivergenceOperatorKind = 'divergence_operator';

  static token: DivergenceOperatorToken = '<';

  static components: ConstructComponents = operatorComponents(DivergenceOperator);
}
