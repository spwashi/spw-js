import { IConstructComponent } from '../../../../../_abstract/_types/IConstructComponent';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PrefixedPerformanceExpressionKind } from './__types';

type StaticType = IConstructClass<PrefixedPerformanceExpressionKind>;

@staticImplements<StaticType>()
export class PrefixedPerformanceExpression extends Expression<PrefixedPerformanceExpressionKind> {
  static readonly kind: PrefixedPerformanceExpressionKind = 'prefixed_performance_expression';

  static components = {
    head: new ConstructComponent({ name: 'head' }),
    tail: new ConstructComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.head;
      yield this.tail;
    },
  };
}
