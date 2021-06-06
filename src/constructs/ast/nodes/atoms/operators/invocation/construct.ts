import SpwOperator, { operatorComponents } from '../_abstract/operator';
import {
  ConstructComponents,
  ISpwConstructStatic,
} from '../../../../_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { IAtomicSpwOperatorStatic } from '../_abstract/_types/atomic';

type Token = '~';
type Kind = 'invocation';

const token: Token = '~';
const kind: Kind = 'invocation';

@staticImplements<
  ISpwConstructStatic<'invocation'> & IAtomicSpwOperatorStatic<'~'>
>()
export class InvocationOperator extends SpwOperator<Kind> {
  static readonly kind: Kind = kind;

  static readonly token: Token = token;

  static components: ConstructComponents =
    operatorComponents(InvocationOperator);
}
