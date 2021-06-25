import Operator, { operatorComponents } from '../_abstract/operator';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ITokenOperatorClass } from '../_abstract/_types/atomic';
import {
  InvocationOperatorKind,
  InvocationOperatorToken,
} from '@constructs/ast/nodes/atoms/operators/invocation/__types';

@staticImplements<IConstructClass<'invocation'> & ITokenOperatorClass<'~'>>()
export class InvocationOperator extends Operator<InvocationOperatorKind> {
  static readonly kind: InvocationOperatorKind = 'invocation';

  static readonly token: InvocationOperatorToken = '~';

  static components: ConstructComponents = operatorComponents(InvocationOperator);
}
