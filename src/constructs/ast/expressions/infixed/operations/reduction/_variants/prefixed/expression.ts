import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PrefixedReductionExpressionKind } from '@constructs/ast/expressions/infixed/operations/reduction/_variants/prefixed/__types';

type StaticType = IConstructClass<PrefixedReductionExpressionKind>;

@staticImplements<StaticType>()
export class PrefixedReductionExpression extends Expression<PrefixedReductionExpressionKind> {
  static readonly kind: PrefixedReductionExpressionKind = 'prefixed_reduction_expression';

  static components = {
    head: Construct.makeComponent({ name: 'head' }),
    tail: Construct.makeComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      if (this.head) yield this.head;
      if (this.tail) yield this.tail;
    },
  };
}
