import { IConstructComponent } from '../../../_abstract/_types/IConstructComponent';
import { ConstructMetaComponent } from '@constructs/ast/_abstract/component/component';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PostfixExpressionKind } from './__types';

export class PostfixedExpression extends Expression<PostfixExpressionKind> {
  static kind: PostfixExpressionKind = 'postfixed_expression';

  static components = {
    operator: new ConstructMetaComponent({ name: 'operator' }),

    operands: new ConstructMetaComponent({
      name: 'operands',
      subjectEvaluators: {
        stringify: (operands = []) => '(' + operands.join(', ') + ')',
      },
    }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.operands;
      yield this.operator;
    },
  };
}
