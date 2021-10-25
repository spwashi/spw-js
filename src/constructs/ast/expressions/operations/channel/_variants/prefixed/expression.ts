import { IConstructComponent } from '../../../../../_abstract/_types/IConstructComponent';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PrefixedChannelExpressionKind } from './__types';

type StaticType = IConstructClass<PrefixedChannelExpressionKind>;

@staticImplements<StaticType>()
export class PrefixedChannelExpression extends Expression<PrefixedChannelExpressionKind> {
  static readonly kind: PrefixedChannelExpressionKind = 'prefixed_channel_expression';

  static components = {
    head: new ConstructComponent({ name: 'head' }),
    tail: new ConstructComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.head;
      yield this.tail;
    },
  };
}
