import { IConstructComponent } from '../../../../../_abstract/_types/IConstructComponent';
import { ConstructMetaComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { InfixedChannelExpressionKind } from '@constructs/ast/expressions/operations/channel/_variants/infixed/__types';

@staticImplements<IConstructClass<InfixedChannelExpressionKind>>()
export class InfixedChannelExpression extends Expression<InfixedChannelExpressionKind> {
  static readonly kind: InfixedChannelExpressionKind = 'infixed_channel_expression';

  static components = {
    head: new ConstructMetaComponent({ name: 'head' }),
    tail: new ConstructMetaComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.head;
      yield this.tail;
    },
  };
}
