import Operator, { operatorComponents } from '../_abstract/operator';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';
import { staticImplements } from '../../../../_util/typescript/staticImplements';
import { ITokenOperatorClass } from '../_abstract/_types/atomic';
import {
  ChannelOperatorKind,
  ChannelOperatorToken,
} from '@constructs/ast/nodes/atoms/operators/channel/__types';

type StaticType = IConstructClass<'channel'> & ITokenOperatorClass<'#'>;

@staticImplements<StaticType>()
export class ChannelOperator extends Operator<ChannelOperatorKind> {
  static readonly kind: ChannelOperatorKind = 'channel';

  static readonly token: ChannelOperatorToken = '#';

  static components: ConstructComponents = operatorComponents(ChannelOperator);
}
