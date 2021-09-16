import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { PerspectiveOperatorKind, PerspectiveOperatorToken } from './__types';

@staticImplements<IConstructClass<'perspective'> & ITokenOperatorClass<'@'>>()
export class PerspectiveOperator extends Operator<PerspectiveOperatorKind> {
  static readonly kind: PerspectiveOperatorKind = 'perspective';

  static readonly token: PerspectiveOperatorToken = '@';

  static components: ConstructComponents = operatorComponents(PerspectiveOperator);
}
