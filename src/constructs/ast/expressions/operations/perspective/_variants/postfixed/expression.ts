import { IConstructComponent } from '../../../../../_abstract/_types/IConstructComponent';
import { ConstructMetaComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PostfixedPerspectiveExpressionKind } from './__types';

type StaticType = IConstructClass<PostfixedPerspectiveExpressionKind>;

@staticImplements<StaticType>()
export class PostfixedPerspectiveExpression extends Expression<PostfixedPerspectiveExpressionKind> {
  static readonly kind: PostfixedPerspectiveExpressionKind = 'postfixed_perspective_expression';

  static components = {
    head: new ConstructMetaComponent({ name: 'head' }),
    tail: new ConstructMetaComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.head;
      yield this.tail;
    },
  };
}
