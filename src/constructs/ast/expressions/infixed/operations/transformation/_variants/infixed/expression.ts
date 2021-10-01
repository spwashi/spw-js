import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { InfixedTransformationExpressionKind } from '@constructs/ast/expressions/infixed/operations/transformation/_variants/infixed/__types';

@staticImplements<IConstructClass<InfixedTransformationExpressionKind>>()
export class InfixedTransformationExpression extends Expression<InfixedTransformationExpressionKind> {
  static readonly kind: InfixedTransformationExpressionKind = 'infixed_transformation_expression';

  static components = {
    head: Construct.makeComponent({ name: 'head' }),
    tail: Construct.makeComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.head;
      yield this.tail;
    },
  };
}
