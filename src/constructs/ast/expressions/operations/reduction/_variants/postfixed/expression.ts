import { IConstructComponent } from '../../../../../_abstract/_types/IConstructComponent';
import { ConstructMetaComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PostfixedReductionExpressionKind } from '@constructs/ast/expressions/operations/reduction/_variants/postfixed/__types';

type StaticType = IConstructClass<PostfixedReductionExpressionKind>;

@staticImplements<StaticType>()
export class PostfixedReductionExpression extends Expression<PostfixedReductionExpressionKind> {
  static readonly kind: PostfixedReductionExpressionKind = 'postfixed_reduction_expression';

  static components = {
    head: new ConstructMetaComponent({ name: 'head' }),
    tail: new ConstructMetaComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.head;
      yield this.tail;
    },
  };
}
