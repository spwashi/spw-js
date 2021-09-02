import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ITokenOperatorClass } from '../../../_abstract/_types/atomic';
import { InvocationOperatorKind, InvocationOperatorToken } from './__types';
import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';

@staticImplements<IConstructClass<'invocation'> & ITokenOperatorClass<'~'>>()
export class InvocationOperator extends Operator<InvocationOperatorKind> {
  static readonly kind: InvocationOperatorKind = 'invocation';

  static readonly token: InvocationOperatorToken = '~';

  static components: ConstructComponents = operatorComponents(InvocationOperator);
}
