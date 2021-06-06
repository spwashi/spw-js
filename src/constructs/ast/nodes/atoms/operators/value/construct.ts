import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  ISpwConstructStatic,
  ConstructComponents,
} from '../../../../_abstract/construct';
import { IAtomicSpwOperatorStatic } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator, {
  operatorComponents,
} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type ValueToken = '*';

@staticImplements<
  ISpwConstructStatic<'value'> & IAtomicSpwOperatorStatic<'*'>
>()
export class ValueOperator extends SpwOperator<'value'> {
  static kind: 'value' = 'value';

  static token: ValueToken = '*';

  static components: ConstructComponents = operatorComponents(ValueOperator);
}
