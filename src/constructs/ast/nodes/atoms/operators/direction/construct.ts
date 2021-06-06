import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  ISpwConstructStatic,
  ConstructComponents,
} from '../../../../_abstract/construct';
import { IAtomicSpwOperatorStatic } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator, {
  operatorComponents,
} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type DirectionToken = '->';

@staticImplements<
  ISpwConstructStatic<'direction'> & IAtomicSpwOperatorStatic<'->'>
>()
export class DirectionOperator extends SpwOperator<'direction'> {
  static kind: 'direction' = 'direction';

  static token: DirectionToken = '->';

  static components: ConstructComponents =
    operatorComponents(DirectionOperator);
}
