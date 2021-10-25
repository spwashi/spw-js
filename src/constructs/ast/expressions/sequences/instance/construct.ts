import { IConstructComponent } from '../../../_abstract/_types/IConstructComponent';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { InstanceExpressionKind } from './__types';

@staticImplements<IConstructClass<InstanceExpressionKind>>()
export class InstanceExpression extends Expression<InstanceExpressionKind> {
  static readonly kind: InstanceExpressionKind = 'instance_expression';

  static components = {
    entity: new ConstructComponent({ name: 'entity' }),
    behavior: new ConstructComponent({ name: 'behavior' }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.entity;
      yield this.behavior;
    },
  };

  static isInstanceExpression(o: unknown): o is InstanceExpression {
    return (o as InstanceExpression)?.kind === this.kind;
  }
}
