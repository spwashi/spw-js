import { IConstructComponent } from '../../../../_abstract/_types/IConstructComponent';
import { ConstructMetaComponent } from '@constructs/ast/_abstract/component/component';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { CommonExpressionTailKind } from '@constructs/ast/expressions/groups/common/_components/__types';
import { IConstructClass } from '../../../../_abstract/construct';

type StaticType = IConstructClass<CommonExpressionTailKind>;

@staticImplements<StaticType>()
export class CommonExpressionTail extends Expression<CommonExpressionTailKind> {
  static readonly kind: CommonExpressionTailKind = 'common_tail';

  static components = {
    operator: new ConstructMetaComponent({ name: 'operator' }),
    item: new ConstructMetaComponent({ name: 'item' }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      if (this.operator) yield this.operator;
      if (this.item) yield this.item;
    },
  };
}
