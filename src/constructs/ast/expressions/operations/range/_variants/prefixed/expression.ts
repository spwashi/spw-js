import { IConstructComponent } from '../../../../../_abstract/_types/IConstructComponent';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PrefixedRangeExpressionKind } from '@constructs/ast/expressions/operations/range/_variants/prefixed/__types';

type StaticType = IConstructClass<PrefixedRangeExpressionKind>;

@staticImplements<StaticType>()
export class PrefixedRangeExpression extends Expression<PrefixedRangeExpressionKind> {
  static readonly kind: PrefixedRangeExpressionKind = 'prefixed_range_expression';

  static components = {
    head: new ConstructComponent({ name: 'head' }),
    tail: new ConstructComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.head;
      yield this.tail;
    },
  };
}
