import { IConstructComponent } from '../../../../../_abstract/_types/IConstructComponent';
import { ConstructMetaComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PrefixedAggregationExpressionKind } from '@constructs/ast/expressions/operations/aggregation/_variants/prefixed/__types';

type StaticType = IConstructClass<PrefixedAggregationExpressionKind>;

@staticImplements<StaticType>()
export class PrefixedAggregationExpression extends Expression<PrefixedAggregationExpressionKind> {
  static readonly kind: PrefixedAggregationExpressionKind = 'prefixed_aggregation_expression';

  static components = {
    head: new ConstructMetaComponent({ name: 'head' }),
    tail: new ConstructMetaComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.head;
      yield this.tail;
    },
  };
}
