import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { LocatedEntityExpressionKind } from '@constructs/ast/expressions/sequence/located_entity/__types';

@staticImplements<IConstructClass<LocatedEntityExpressionKind>>()
export class LocatedEntityExpression extends Expression<LocatedEntityExpressionKind> {
  static readonly kind: LocatedEntityExpressionKind = 'located_entity_expression';

  static components = {
    address: Construct.makeComponent({ name: 'address' }),
    entity: Construct.makeComponent({ name: 'entity' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.address;
      yield this.entity;
    },
  };

  static isLocatedEntityExpression(o: unknown): o is LocatedEntityExpression {
    return (o as LocatedEntityExpression)?.kind === this.kind;
  }
}
