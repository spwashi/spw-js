import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { LocatedConceptExpressionKind } from '@constructs/ast/expressions/sequence/located_concept/__types';

@staticImplements<IConstructClass<LocatedConceptExpressionKind>>()
export class LocatedConceptExpression extends Expression<LocatedConceptExpressionKind> {
  static readonly kind: LocatedConceptExpressionKind = 'located_concept_expression';

  static components = {
    address: new ConstructComponent({ name: 'address' }),
    concept: new ConstructComponent({ name: 'concept' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.address;
      yield this.concept;
    },
  };

  static isLocatedConceptExpression(o: unknown): o is LocatedConceptExpression {
    return (o as LocatedConceptExpression)?.kind === this.kind;
  }
}
