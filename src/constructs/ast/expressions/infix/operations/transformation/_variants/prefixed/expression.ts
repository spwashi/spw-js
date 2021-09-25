import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PrefixedTransformationExpressionKind } from '@constructs/ast/expressions/infix/operations/transformation/_variants/prefixed/__types';
import { Construct, IConstructClass } from '../../../../../../_abstract/construct';

type StaticType = IConstructClass<PrefixedTransformationExpressionKind>;

@staticImplements<StaticType>()
export class PrefixedTransformationExpression extends Expression<PrefixedTransformationExpressionKind> {
  static readonly kind: PrefixedTransformationExpressionKind = 'prefixed_transformation_expression';

  static components = {
    operator: Construct.makeComponent({ name: 'operator' }),
    item: Construct.makeComponent({ name: 'item' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      if (this.operator) yield this.operator;
      if (this.item) yield this.item;
    },
  };
}
