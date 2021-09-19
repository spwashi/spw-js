import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { BehaviorExpressionKind } from '@constructs/ast/expressions/sequence/behavior/__types';

@staticImplements<IConstructClass<'behavior_expression'>>()
export class BehaviorExpression extends Expression<BehaviorExpressionKind> {
  static readonly kind: BehaviorExpressionKind = 'behavior_expression';

  static components = {
    address: Construct.makeComponent({ name: 'address' }),
    domain: Construct.makeComponent({ name: 'domain' }),
    essence: Construct.makeComponent({ name: 'essence' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.address;
      yield this.domain;
      yield this.essence;
    },
  };

  static isBehaviorExpression(o: unknown): o is BehaviorExpression {
    return (o as BehaviorExpression)?.kind === this.kind;
  }
}