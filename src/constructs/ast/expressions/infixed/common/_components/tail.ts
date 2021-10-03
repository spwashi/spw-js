import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { CommonExpressionTailKind } from '@constructs/ast/expressions/infixed/common/_components/__types';
import { IConstructClass } from '../../../../_abstract/construct';

type StaticType = IConstructClass<CommonExpressionTailKind>;

@staticImplements<StaticType>()
export class CommonExpressionTail extends Expression<CommonExpressionTailKind> {
  static readonly kind: CommonExpressionTailKind = 'common_tail';

  static components = {
    operator: new ConstructComponent({ name: 'operator' }),
    item: new ConstructComponent({ name: 'item' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      if (this.operator) yield this.operator;
      if (this.item) yield this.item;
    },
  };
}
