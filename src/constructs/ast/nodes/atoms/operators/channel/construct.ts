import SpwOperator, { operatorComponents } from '../_abstract/operator';
import {
  ISpwConstructStatic,
  ConstructComponents,
} from '../../../../_abstract/spwConstruct';
import { staticImplements } from '../../../../_util/typescript/staticImplements';
import { IAtomicSpwOperatorStatic } from '../_abstract/_types/atomic';

type Token = '#';
type Kind = 'channel';

const token: Token = '#';
const kind: Kind = 'channel';

@staticImplements<
  ISpwConstructStatic<'channel'> & IAtomicSpwOperatorStatic<'#'>
>()
export class ChannelOperator extends SpwOperator<Kind> {
  static readonly kind: Kind = kind;

  static readonly token: Token = token;

  static components: ConstructComponents = operatorComponents(ChannelOperator);
}
