import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  ISpwConstructStatic,
  ConstructComponents,
} from '../../../../_abstract/construct';
import { IAtomicSpwOperatorStatic } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator, {
  operatorComponents,
} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type TransformationToken = '=>';

@staticImplements<
  ISpwConstructStatic<'transformation'> & IAtomicSpwOperatorStatic<'=>'>
>()
export class TransformationOperator extends SpwOperator<'transformation'> {
  static kind: 'transformation' = 'transformation';

  static token: TransformationToken = '=>';

  static components: ConstructComponents = operatorComponents(
    TransformationOperator,
  );
}
