import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { BehaviorExpressionKind } from '@constructs/ast/expressions/sequences/behavior/__types';

@staticImplements<IConstructClass<'behavior_expression'>>()
export class BehaviorExpression extends Expression<BehaviorExpressionKind> {
  static readonly kind: BehaviorExpressionKind = 'behavior_expression';

  static components = {
    location: new ConstructComponent({ name: 'location' }),
    domain: new ConstructComponent({ name: 'domain' }),
    essence: new ConstructComponent({ name: 'essence' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.location;
      yield this.domain;
      yield this.essence;
    },
  };

  static isBehaviorExpression(o: unknown): o is BehaviorExpression {
    return (o as BehaviorExpression)?.kind === this.kind;
  }
}
