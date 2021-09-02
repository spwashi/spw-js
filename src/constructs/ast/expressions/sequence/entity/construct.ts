import { ComponentDescription } from '@constructs/ast/_abstract/_types';
import { EntityExpressionKind } from './__types';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';

@staticImplements<IConstructClass<EntityExpressionKind>>()
export class EntityExpression extends Expression<EntityExpressionKind> {
  static readonly kind: EntityExpressionKind = 'entity_expression';

  static components = {
    concept: Construct.makeComponent({ name: 'concept' }),
    anchor: Construct.makeComponent({ name: 'anchor' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      if (this.concept) yield this.concept;
      if (this.anchor) yield this.anchor;
    },
  };

  static isEntityExpression(o: unknown): o is EntityExpression {
    return (o as EntityExpression)?.kind === this.kind;
  }
}
