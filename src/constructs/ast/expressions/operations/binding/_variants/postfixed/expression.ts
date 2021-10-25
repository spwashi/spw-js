import { IConstructComponent } from '../../../../../_abstract/_types/IConstructComponent';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PostfixedBindingExpressionKind } from '@constructs/ast/expressions/operations/binding/_variants/postfixed/__types';

type StaticType = IConstructClass<PostfixedBindingExpressionKind>;

@staticImplements<StaticType>()
export class PostfixedBindingExpression extends Expression<PostfixedBindingExpressionKind> {
  static readonly kind: PostfixedBindingExpressionKind = 'postfixed_binding_expression';

  static components = {
    head: new ConstructComponent({ name: 'head' }),
    tail: new ConstructComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.head;
      yield this.tail;
    },
  };
}
