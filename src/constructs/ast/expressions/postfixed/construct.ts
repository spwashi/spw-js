import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PostfixExpressionKind } from './__types';

export class PostfixExpression extends Expression<PostfixExpressionKind> {
  static kind: PostfixExpressionKind = 'postfix_expression';

  static components = {
    operator: new ConstructComponent({ name: 'operator' }),

    operands: new ConstructComponent({
      name: 'operands',
      evaluators: {
        stringify: (operands = []) => operands.join(', '),
      },
    }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.operator;
      yield this.operands;
    },
  };
}
