import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { LocatedEssenceExpressionKind } from '@constructs/ast/expressions/sequence/behavior/sub/located_essence/__types';

@staticImplements<IConstructClass<LocatedEssenceExpressionKind>>()
export class LocatedEssenceExpression extends Expression<LocatedEssenceExpressionKind> {
  static readonly kind: LocatedEssenceExpressionKind = 'located_essence_expression';

  static components: ConstructComponents = {
    location: new ConstructComponent({ name: 'location' }),
    essence: new ConstructComponent({ name: 'essence' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.location;
      yield this.essence;
    },
  };

  static isLocatedEssenceExpression(o: unknown): o is LocatedEssenceExpression {
    return (o as LocatedEssenceExpression)?.kind === this.kind;
  }
}
