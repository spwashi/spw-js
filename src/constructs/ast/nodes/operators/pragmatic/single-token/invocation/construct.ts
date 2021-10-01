import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { ITokenOperatorClass } from '../../../_abstract/_types/atomic';
import { InvocationOperatorKind, InvocationOperatorToken } from './__types';

@staticImplements<IConstructClass<'invocation_operator'> & ITokenOperatorClass<'~'>>()
export class InvocationOperator extends Operator<InvocationOperatorKind> {
  static readonly kind: InvocationOperatorKind = 'invocation_operator';

  static readonly token: InvocationOperatorToken = '~';

  static components: ConstructComponents = operatorComponents(InvocationOperator);
}
