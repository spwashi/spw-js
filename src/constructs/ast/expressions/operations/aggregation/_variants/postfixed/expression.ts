import { IConstructComponent } from '../../../../../_abstract/_types/IConstructComponent';
import { ConstructMetaComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PostfixedAggregationExpressionKind } from '@constructs/ast/expressions/operations/aggregation/_variants/postfixed/__types';

type StaticType = IConstructClass<PostfixedAggregationExpressionKind>;

@staticImplements<StaticType>()
export class PostfixedAggregationExpression extends Expression<PostfixedAggregationExpressionKind> {
  static readonly kind: PostfixedAggregationExpressionKind = 'postfixed_aggregation_expression';

  static components = {
    head: new ConstructMetaComponent({ name: 'head' }),
    tail: new ConstructMetaComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.head;
      yield this.tail;
    },
  };
}
