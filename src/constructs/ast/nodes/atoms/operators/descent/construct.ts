import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  ISpwConstructStatic,
  ConstructComponents,
} from '@constructs/ast/_abstract/spwConstruct';
import { IAtomicSpwOperatorStatic } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator, {
  operatorComponents,
} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type DescentToken = '.';

@staticImplements<
  ISpwConstructStatic<'descent'> & IAtomicSpwOperatorStatic<'.'>
>()
export class DescentOperator extends SpwOperator<'descent'> {
  static kind: 'descent' = 'descent';

  static token: DescentToken = '.';

  static components: ConstructComponents = operatorComponents(DescentOperator);
}
