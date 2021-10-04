import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { InfixedEvaluationExpressionKind } from '@constructs/ast/expressions/operations/evaluation/_variants/infixed/__types';

@staticImplements<IConstructClass<InfixedEvaluationExpressionKind>>()
export class InfixedEvaluationExpression extends Expression<InfixedEvaluationExpressionKind> {
  static readonly kind: InfixedEvaluationExpressionKind = 'infixed_evaluation_expression';

  static components = {
    head: new ConstructComponent({ name: 'head' }),
    tail: new ConstructComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.head;
      yield this.tail;
    },
  };
}
