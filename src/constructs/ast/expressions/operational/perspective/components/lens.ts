import { SpwExpression } from '@constructs/ast/expressions/_abstract/expression';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  ISpwConstructStatic,
  SpwConstruct,
} from '@constructs/ast/_abstract/spwConstruct';
import { ComponentDescription } from '@constructs/ast/_abstract/_types';

@staticImplements<ISpwConstructStatic<'lens'>>()
export class Lens extends SpwExpression<'lens'> {
  static readonly kind = 'lens';

  static components = {
    atom: SpwConstruct.makeComponent({ name: 'atom' }),
    spec: SpwConstruct.makeComponent({ name: 'spec' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.atom;
      yield this.spec;
    },
  };
}
