import { IConstructComponent } from '../../../../../_abstract/_types/IConstructComponent';
import { ConstructMetaComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PrefixedTransformationExpressionKind } from './__types';

type StaticType = IConstructClass<PrefixedTransformationExpressionKind>;

@staticImplements<StaticType>()
export class PrefixedTransformationExpression extends Expression<PrefixedTransformationExpressionKind> {
  static readonly kind: PrefixedTransformationExpressionKind = 'prefixed_transformation_expression';

  static components = {
    head: new ConstructMetaComponent({ name: 'head' }),
    tail: new ConstructMetaComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.head;
      yield this.tail;
    },
  };
}
