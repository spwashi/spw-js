import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PostfixedAggregationExpressionKind } from '@constructs/ast/expressions/operations/aggregation/_variants/postfixed/__types';

type StaticType = IConstructClass<PostfixedAggregationExpressionKind>;

@staticImplements<StaticType>()
export class PostfixedAggregationExpression extends Expression<PostfixedAggregationExpressionKind> {
  static readonly kind: PostfixedAggregationExpressionKind = 'postfixed_aggregation_expression';

  static components = {
    head: new ConstructComponent({ name: 'head' }),
    tail: new ConstructComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      if (this.head) yield this.head;
      if (this.tail) yield this.tail;
    },
  };
}
