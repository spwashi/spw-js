import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  ISpwConstructStatic,
  ConstructComponents,
} from '../../../../_abstract/construct';
import { IAtomicSpwOperatorStatic } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator, {
  operatorComponents,
} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type AscentToken = '^';

@staticImplements<
  ISpwConstructStatic<'ascent'> & IAtomicSpwOperatorStatic<'^'>
>()
export class AscentOperator extends SpwOperator<'ascent'> {
  static kind: 'ascent' = 'ascent';

  static token: AscentToken = '^';

  static components: ConstructComponents = operatorComponents(AscentOperator);
}
