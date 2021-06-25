import Operator, { operatorComponents } from '../_abstract/operator';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ITokenOperatorClass } from '../_abstract/_types/atomic';
import {
  PerspectiveOperatorKind,
  PerspectiveOperatorToken,
} from '@constructs/ast/nodes/atoms/operators/perspective/__types';

@staticImplements<IConstructClass<'perspective'> & ITokenOperatorClass<'@'>>()
export class PerspectiveOperator extends Operator<PerspectiveOperatorKind> {
  static readonly kind: PerspectiveOperatorKind = 'perspective';

  static readonly token: PerspectiveOperatorToken = '@';

  static components: ConstructComponents = operatorComponents(PerspectiveOperator);
}
