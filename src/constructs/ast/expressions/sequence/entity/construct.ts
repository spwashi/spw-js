import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { EntityExpressionKind } from './__types';

@staticImplements<IConstructClass<EntityExpressionKind>>()
export class EntityExpression extends Expression<EntityExpressionKind> {
  static readonly kind: EntityExpressionKind = 'entity_expression';

  static components = {
    concept: Construct.makeComponent({ name: 'concept' }),
    anchor: Construct.makeComponent({ name: 'anchor' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.concept;
      yield this.anchor;
    },
  };

  static isEntityExpression(o: unknown): o is EntityExpression {
    return (o as EntityExpression)?.kind === this.kind;
  }
}
