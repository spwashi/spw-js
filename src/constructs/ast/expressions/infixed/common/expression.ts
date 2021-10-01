import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { CommonExpressionKind } from '@constructs/ast/expressions/infixed/common/__types';
import { Construct, IConstructClass } from '../../../_abstract/construct';

@staticImplements<IConstructClass<CommonExpressionKind>>()
export class CommonExpression extends Expression<CommonExpressionKind> {
  static readonly kind: CommonExpressionKind = 'common_expression';

  static components = {
    head: Construct.makeComponent({ name: 'head' }),
    tail: Construct.makeComponent({ name: 'tail' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.head;
      yield this.tail;
    },
  };
}
