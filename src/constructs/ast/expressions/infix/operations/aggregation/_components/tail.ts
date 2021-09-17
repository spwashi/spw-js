import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { AggregationTailKind } from '@constructs/ast/expressions/infix/operations/aggregation/_components/__types';
import { Construct, IConstructClass } from '../../../../../_abstract/construct';

type StaticType = IConstructClass<AggregationTailKind>;

@staticImplements<StaticType>()
export class AggregationExpressionTail extends Expression<AggregationTailKind> {
  static readonly kind: AggregationTailKind = 'aggregation_expression_tail';

  static components = {
    operator: Construct.makeComponent({ name: 'operator' }),
    item: Construct.makeComponent({ name: 'item' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      if (this.operator) yield this.operator;
      if (this.item) yield this.item;
    },
  };
}
