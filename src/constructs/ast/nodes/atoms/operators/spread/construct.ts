import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  ISpwConstructStatic,
  ConstructComponents,
} from '../../../../_abstract/construct';
import { IAtomicSpwOperatorStatic } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator, {
  operatorComponents,
} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type SpreadToken = '...';

@staticImplements<
  ISpwConstructStatic<'spread'> & IAtomicSpwOperatorStatic<'...'>
>()
export class SpreadOperator extends SpwOperator<'spread'> {
  static kind: 'spread' = 'spread';

  static token: SpreadToken = '...';

  static components: ConstructComponents = operatorComponents(SpreadOperator);
}
