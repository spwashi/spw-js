import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PrefixedTransformationExpressionKind } from './__types';

type StaticType = IConstructClass<PrefixedTransformationExpressionKind>;

@staticImplements<StaticType>()
export class PrefixedTransformationExpression extends Expression<PrefixedTransformationExpressionKind> {
  static readonly kind: PrefixedTransformationExpressionKind = 'prefixed_transformation_expression';

  static components = {
    head: new ConstructComponent({ name: 'head' }),
    tail: new ConstructComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.head;
      yield this.tail;
    },
  };
}
