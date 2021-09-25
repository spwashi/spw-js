import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PrefixedRangeExpressionKind } from '@constructs/ast/expressions/infix/operations/range/_variants/prefixed/__types';

type StaticType = IConstructClass<PrefixedRangeExpressionKind>;

@staticImplements<StaticType>()
export class PrefixedRangeExpression extends Expression<PrefixedRangeExpressionKind> {
  static readonly kind: PrefixedRangeExpressionKind = 'prefixed_range_expression';

  static components = {
    operator: Construct.makeComponent({ name: 'operator' }),
    item: Construct.makeComponent({ name: 'item' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      if (this.operator) yield this.operator;
      if (this.item) yield this.item;
    },
  };
}
