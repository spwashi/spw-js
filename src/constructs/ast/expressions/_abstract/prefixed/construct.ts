import { IConstructComponent } from '../../../_abstract/_types/IConstructComponent';
import { ConstructMetaComponent } from '@constructs/ast/_abstract/component/component';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PrefixExpressionKind } from './__types';

export class PrefixedExpression extends Expression<PrefixExpressionKind> {
  static kind: PrefixExpressionKind = 'prefixed_expression';

  static components = {
    operator: new ConstructMetaComponent({ name: 'operator' }),

    operands: new ConstructMetaComponent({
      name: 'operands',
      subjectEvaluators: {
        stringify: (operands = []) => operands.join(', '),
      },
    }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.operator;
      yield this.operands;
    },
  };
}
