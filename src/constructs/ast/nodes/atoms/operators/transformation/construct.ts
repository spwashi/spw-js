import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import Operator, {
  operatorComponents,
} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';
import {
  TransformationOperatorKind,
  TransformationOperatorToken,
} from '@constructs/ast/nodes/atoms/operators/transformation/__types';

type StaticType = IConstructClass<TransformationOperatorKind> &
  ITokenOperatorClass<TransformationOperatorToken>;

@staticImplements<StaticType>()
export class TransformationOperator extends Operator<'transformation'> {
  static kind: TransformationOperatorKind = 'transformation';

  static token: TransformationOperatorToken = '=>';

  static components: ConstructComponents = operatorComponents(TransformationOperator);
}
