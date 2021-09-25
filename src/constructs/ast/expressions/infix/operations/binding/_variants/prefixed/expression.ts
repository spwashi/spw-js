import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PrefixedBindingExpressionKind } from '@constructs/ast/expressions/infix/operations/binding/_variants/prefixed/__types';

type StaticType = IConstructClass<PrefixedBindingExpressionKind>;

@staticImplements<StaticType>()
export class PrefixedBindingExpression extends Expression<PrefixedBindingExpressionKind> {
  static readonly kind: PrefixedBindingExpressionKind = 'prefixed_binding_expression';

  static components = {
    operator: Construct.makeComponent({ name: 'operator' }),
    item: Construct.makeComponent({ name: 'item' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      if (this.operator) yield this.operator;
      if (this.item) yield this.item;
    },
  };
}
