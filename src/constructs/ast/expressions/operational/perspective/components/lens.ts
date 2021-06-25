import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Construct, IConstructClass } from '../../../../_abstract/construct';
import { ComponentDescription } from '@constructs/ast/_abstract/_types';
import { LensKind } from '@constructs/ast/expressions/operational/perspective/components/__types';

type StaticType = IConstructClass<LensKind>;

@staticImplements<StaticType>()
export class Lens extends Expression<LensKind> {
  static readonly kind: LensKind = 'lens';

  static components = {
    atom: Construct.makeComponent({ name: 'atom' }),
    spec: Construct.makeComponent({ name: 'spec' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.atom;
      yield this.spec;
    },
  };
}
