import { ComponentDescription } from '@constructs/ast/_abstract/_types';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { InstanceExpressionKind } from './__types';

@staticImplements<IConstructClass<InstanceExpressionKind>>()
export class InstanceExpression extends Expression<InstanceExpressionKind> {
  static readonly kind: InstanceExpressionKind = 'instance_expression';

  static components = {
    entity: Construct.makeComponent({ name: 'entity' }),
    behavior: Construct.makeComponent({ name: 'behavior' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.entity;
      yield this.behavior;
    },
  };

  static isInstanceExpression(o: unknown): o is InstanceExpression {
    return (o as InstanceExpression)?.kind === this.kind;
  }
}
