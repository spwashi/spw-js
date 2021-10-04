import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PostfixedInvocationExpressionKind } from './__types';

type StaticType = IConstructClass<PostfixedInvocationExpressionKind>;

@staticImplements<StaticType>()
export class PostfixedInvocationExpression extends Expression<PostfixedInvocationExpressionKind> {
  static readonly kind: PostfixedInvocationExpressionKind = 'postfixed_invocation_expression';

  static components = {
    head: new ConstructComponent({ name: 'head' }),
    tail: new ConstructComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.head;
      yield this.tail;
    },
  };
}
