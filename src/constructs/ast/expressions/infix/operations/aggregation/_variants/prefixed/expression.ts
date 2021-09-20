import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PrefixedAggregationExpressionKind } from '@constructs/ast/expressions/infix/operations/aggregation/_variants/prefixed/__types';

type StaticType = IConstructClass<PrefixedAggregationExpressionKind>;

@staticImplements<StaticType>()
export class PrefixedAggregationExpression extends Expression<PrefixedAggregationExpressionKind> {
  static readonly kind: PrefixedAggregationExpressionKind = 'prefixed_aggregation_expression';

  static components = {
    operator: Construct.makeComponent({ name: 'operator' }),
    item: Construct.makeComponent({ name: 'item' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      if (this.operator) yield this.operator;
      if (this.item) yield this.item;
    },
  };
}
