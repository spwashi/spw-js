import { IConstructComponent } from '../../../_abstract/_types/IConstructComponent';
import { ConstructMetaComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { BehaviorExpressionKind } from '@constructs/ast/expressions/sequences/behavior/__types';

@staticImplements<IConstructClass<'behavior_expression'>>()
export class BehaviorExpression extends Expression<BehaviorExpressionKind> {
  static readonly kind: BehaviorExpressionKind = 'behavior_expression';

  static components = {
    location: new ConstructMetaComponent({ name: 'location' }),
    domain: new ConstructMetaComponent({ name: 'domain' }),
    essence: new ConstructMetaComponent({ name: 'essence' }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.location;
      yield this.domain;
      yield this.essence;
    },
  };

  static isBehaviorExpression(o: unknown): o is BehaviorExpression {
    return (o as BehaviorExpression)?.kind === this.kind;
  }
}
