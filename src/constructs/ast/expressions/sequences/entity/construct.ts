import { IConstructComponent } from '../../../_abstract/_types/IConstructComponent';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { EntityExpressionKind } from './__types';

@staticImplements<IConstructClass<EntityExpressionKind>>()
export class EntityExpression extends Expression<EntityExpressionKind> {
  static readonly kind: EntityExpressionKind = 'entity_expression';

  static components = {
    concept: new ConstructComponent({ name: 'concept' }),
    anchor: new ConstructComponent({ name: 'anchor' }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.concept;
      yield this.anchor;
    },
  };

  static isEntityExpression(o: unknown): o is EntityExpression {
    return (o as EntityExpression)?.kind === this.kind;
  }
}
