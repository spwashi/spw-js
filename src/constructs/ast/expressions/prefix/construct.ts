import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { Construct } from '@constructs/ast/_abstract/construct';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PrefixExpressionKind } from './__types';

export class PrefixExpression extends Expression<PrefixExpressionKind> {
  static kind: PrefixExpressionKind = 'prefix_expression';

  static components = {
    operator: Construct.makeComponent({ name: 'operator' }),

    operands: Construct.makeComponent({
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
