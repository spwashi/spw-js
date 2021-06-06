import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  ISpwConstructStatic,
  ConstructComponents,
} from '../../../../_abstract/construct';
import { IAtomicSpwOperatorStatic } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import SpwOperator, {
  operatorComponents,
} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type ReductionToken = '-';

@staticImplements<
  ISpwConstructStatic<'reduction'> & IAtomicSpwOperatorStatic<'-'>
>()
export class ReductionOperator extends SpwOperator<'reduction'> {
  static kind: 'reduction' = 'reduction';

  static token: ReductionToken = '-';

  static components: ConstructComponents =
    operatorComponents(ReductionOperator);
}
