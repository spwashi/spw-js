import { IConstructComponent } from '../../../../../_abstract/_types/IConstructComponent';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { InfixedTransformationExpressionKind } from '@constructs/ast/expressions/operations/transformation/_variants/infixed/__types';

@staticImplements<IConstructClass<InfixedTransformationExpressionKind>>()
export class InfixedTransformationExpression extends Expression<InfixedTransformationExpressionKind> {
  static readonly kind: InfixedTransformationExpressionKind = 'infixed_transformation_expression';

  static components = {
    head: new ConstructComponent({ name: 'head' }),
    tail: new ConstructComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.head;
      yield this.tail;
    },
  };
}
