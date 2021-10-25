import { IConstructComponent } from '../../../../../_abstract/_types/IConstructComponent';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { InfixedAggregationExpressionKind } from '@constructs/ast/expressions/operations/aggregation/_variants/infixed/__types';

@staticImplements<IConstructClass<InfixedAggregationExpressionKind>>()
export class InfixedAggregationExpression extends Expression<InfixedAggregationExpressionKind> {
  static readonly kind: InfixedAggregationExpressionKind = 'infixed_aggregation_expression';

  static components = {
    head: new ConstructComponent({ name: 'head' }),
    tail: new ConstructComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.head;
      yield this.tail;
    },
  };
}
