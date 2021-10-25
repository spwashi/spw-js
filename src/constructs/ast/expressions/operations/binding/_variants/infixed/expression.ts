import { IConstructComponent } from '../../../../../_abstract/_types/IConstructComponent';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { InfixedBindingExpressionKind } from '@constructs/ast/expressions/operations/binding/_variants/infixed/__types';

@staticImplements<IConstructClass<InfixedBindingExpressionKind>>()
export class InfixedBindingExpression extends Expression<InfixedBindingExpressionKind> {
  static readonly kind: InfixedBindingExpressionKind = 'infixed_binding_expression';

  static components = {
    head: new ConstructComponent({ name: 'head' }),
    tail: new ConstructComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.head;
      yield this.tail;
    },
  };
}
