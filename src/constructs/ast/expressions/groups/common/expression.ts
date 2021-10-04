import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { CommonExpressionKind } from '@constructs/ast/expressions/groups/common/__types';
import { IConstructClass } from '../../../_abstract/construct';

@staticImplements<IConstructClass<CommonExpressionKind>>()
export class CommonExpression extends Expression<CommonExpressionKind> {
  static readonly kind: CommonExpressionKind = 'common_expression';

  static components = {
    head: new ConstructComponent({ name: 'head' }),
    tail: new ConstructComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.head;
      yield this.tail;
    },
  };
}
