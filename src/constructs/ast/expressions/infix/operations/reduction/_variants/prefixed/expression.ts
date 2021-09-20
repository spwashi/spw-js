import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PrefixedReductionExpressionKind } from '@constructs/ast/expressions/infix/operations/reduction/_variants/prefixed/__types';

type StaticType = IConstructClass<PrefixedReductionExpressionKind>;

@staticImplements<StaticType>()
export class PrefixedReductionExpression extends Expression<PrefixedReductionExpressionKind> {
  static readonly kind: PrefixedReductionExpressionKind = 'prefixed_reduction_expression';

  static components = {
    operator: Construct.makeComponent({ name: 'operator' }),
    item: Construct.makeComponent({ name: 'item' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      if (this.operator) yield this.operator;
      if (this.item) yield this.item;
    },
  };
}
