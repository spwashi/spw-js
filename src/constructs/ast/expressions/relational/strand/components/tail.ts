import { SpwExpression } from '@constructs/ast/expressions/_abstract/expression';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  ISpwConstructStatic,
  Construct,
} from '../../../../_abstract/construct';
import { ComponentDescription } from '@constructs/ast/_abstract/_types';

@staticImplements<ISpwConstructStatic<'strand_tail'>>()
export class StrandTail extends SpwExpression<'strand_tail'> {
  static readonly kind = 'strand_tail';

  static components = {
    operator: Construct.makeComponent({ name: 'operator' }),
    item: Construct.makeComponent({ name: 'item' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      if (this.operator) yield this.operator;
      if (this.item) yield this.item;
    },
  };
}
