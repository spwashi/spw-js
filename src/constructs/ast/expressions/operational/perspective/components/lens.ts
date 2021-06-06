import { SpwExpression } from '@constructs/ast/expressions/_abstract/expression';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  ISpwConstructStatic,
  Construct,
} from '../../../../_abstract/construct';
import { ComponentDescription } from '@constructs/ast/_abstract/_types';

@staticImplements<ISpwConstructStatic<'lens'>>()
export class Lens extends SpwExpression<'lens'> {
  static readonly kind = 'lens';

  static components = {
    atom: Construct.makeComponent({ name: 'atom' }),
    spec: Construct.makeComponent({ name: 'spec' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.atom;
      yield this.spec;
    },
  };
}
