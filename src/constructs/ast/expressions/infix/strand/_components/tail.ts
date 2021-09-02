import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Construct, IConstructClass } from '../../../../_abstract/construct';
import { ComponentDescription } from '@constructs/ast/_abstract/_types';
import { StrandTailKind } from '@constructs/ast/expressions/infix/strand/_components/__types';

type StaticType = IConstructClass<StrandTailKind>;

@staticImplements<StaticType>()
export class StrandTail extends Expression<StrandTailKind> {
  static readonly kind: StrandTailKind = 'strand_tail';

  static components = {
    operator: Construct.makeComponent({ name: 'operator' }),
    item: Construct.makeComponent({ name: 'item' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      if (this.operator) yield this.operator;
      if (this.item) yield this.item;
    },
  };
}
