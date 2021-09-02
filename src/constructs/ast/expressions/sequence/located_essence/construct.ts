import { ComponentDescription } from '@constructs/ast/_abstract/_types';
import { LocatedEssenceExpressionKind } from '@constructs/ast/expressions/sequence/located_essence/__types';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  Construct,
  ConstructComponents,
  IConstructClass,
} from '@constructs/ast/_abstract/construct';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';

@staticImplements<IConstructClass<LocatedEssenceExpressionKind>>()
export class LocatedEssenceExpression extends Expression<LocatedEssenceExpressionKind> {
  static readonly kind: LocatedEssenceExpressionKind = 'located_essence_expression';

  static components: ConstructComponents = {
    address: Construct.makeComponent({ name: 'address' }),
    essence: Construct.makeComponent({ name: 'essence' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.address;
      yield this.essence;
    },
  };

  static isLocatedEssenceExpression(o: unknown): o is LocatedEssenceExpression {
    return (o as LocatedEssenceExpression)?.kind === this.kind;
  }
}
