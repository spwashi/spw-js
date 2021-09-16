import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Operator, operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { ChannelOperatorKind, ChannelOperatorToken } from './__types';

type StaticType = IConstructClass<'channel'> & ITokenOperatorClass<'#'>;

@staticImplements<StaticType>()
export class ChannelOperator extends Operator<ChannelOperatorKind> {
  static readonly kind: ChannelOperatorKind = 'channel';

  static readonly token: ChannelOperatorToken = '#';

  static components: ConstructComponents = operatorComponents(ChannelOperator);
}
