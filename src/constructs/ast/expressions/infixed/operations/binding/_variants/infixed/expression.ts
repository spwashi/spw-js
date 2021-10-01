import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { InfixedBindingExpressionKind } from '@constructs/ast/expressions/infixed/operations/binding/_variants/infixed/__types';

@staticImplements<IConstructClass<InfixedBindingExpressionKind>>()
export class InfixedBindingExpression extends Expression<InfixedBindingExpressionKind> {
  static readonly kind: InfixedBindingExpressionKind = 'infixed_binding_expression';

  static components = {
    head: Construct.makeComponent({ name: 'head' }),
    tail: Construct.makeComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.head;
      yield this.tail;
    },
  };
}
