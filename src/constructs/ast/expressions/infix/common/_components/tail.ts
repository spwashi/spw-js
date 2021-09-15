import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Construct, IConstructClass } from '../../../../_abstract/construct';
import { ComponentDescription } from '@constructs/ast/_abstract/_types';
import { CommonExpressionTailKind } from '@constructs/ast/expressions/infix/common/_components/__types';

type StaticType = IConstructClass<CommonExpressionTailKind>;

@staticImplements<StaticType>()
export class CommonExpressionTail extends Expression<CommonExpressionTailKind> {
  static readonly kind: CommonExpressionTailKind = 'common_tail';

  static components = {
    operator: Construct.makeComponent({ name: 'operator' }),
    item: Construct.makeComponent({ name: 'item' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      if (this.operator) yield this.operator;
      if (this.item) yield this.item;
    },
  };
}
