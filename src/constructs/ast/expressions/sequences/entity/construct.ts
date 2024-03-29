import { IConstructComponent } from '../../../_abstract/_types/IConstructComponent';
import { ConstructMetaComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { EntityExpressionKind } from './__types';

@staticImplements<IConstructClass<EntityExpressionKind>>()
export class EntityExpression extends Expression<EntityExpressionKind> {
  static readonly kind: EntityExpressionKind = 'entity_expression';

  static components = {
    concept: new ConstructMetaComponent({ name: 'concept' }),
    identifier: new ConstructMetaComponent({ name: 'identifier' }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.concept;
      yield this.identifier;
    },
  };

  static isEntityExpression(o: unknown): o is EntityExpression {
    return (o as EntityExpression)?.kind === this.kind;
  }
}
