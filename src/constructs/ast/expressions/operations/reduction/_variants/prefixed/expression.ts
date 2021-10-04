import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PrefixedReductionExpressionKind } from '@constructs/ast/expressions/operations/reduction/_variants/prefixed/__types';

type StaticType = IConstructClass<PrefixedReductionExpressionKind>;

@staticImplements<StaticType>()
export class PrefixedReductionExpression extends Expression<PrefixedReductionExpressionKind> {
  static readonly kind: PrefixedReductionExpressionKind = 'prefixed_reduction_expression';

  static components = {
    head: new ConstructComponent({ name: 'head' }),
    tail: new ConstructComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.head;
      yield this.tail;
    },
  };
}
