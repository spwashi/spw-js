import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { LocatedDomainExpressionKind } from '@constructs/ast/expressions/sequence/located_domain/__types';

@staticImplements<IConstructClass<LocatedDomainExpressionKind>>()
export class LocatedDomainExpression extends Expression<LocatedDomainExpressionKind> {
  static readonly kind: LocatedDomainExpressionKind = 'located_domain_expression';

  static components = {
    address: new ConstructComponent({ name: 'address' }),
    domain: new ConstructComponent({ name: 'domain' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.address;
      yield this.domain;
    },
  };

  static isLocatedDomainExpression(o: unknown): o is LocatedDomainExpression {
    return (o as LocatedDomainExpression)?.kind === this.kind;
  }
}
