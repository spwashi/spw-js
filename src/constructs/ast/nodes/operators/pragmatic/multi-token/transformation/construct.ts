import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { TransformationOperatorKind, TransformationOperatorToken } from './__types';

type StaticType = IConstructClass<TransformationOperatorKind> &
  ITokenOperatorClass<TransformationOperatorToken>;

@staticImplements<StaticType>()
export class TransformationOperator extends Operator<'transformation'> {
  static kind: TransformationOperatorKind = 'transformation';

  static token: TransformationOperatorToken = '=>';

  static components: ConstructComponents = operatorComponents(TransformationOperator);
}
