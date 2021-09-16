import { ComponentDescription } from '@constructs/ast/_abstract/_types';
import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { LocatedDomainExpressionKind } from '@constructs/ast/expressions/sequence/located_domain/__types';

@staticImplements<IConstructClass<LocatedDomainExpressionKind>>()
export class LocatedDomainExpression extends Expression<LocatedDomainExpressionKind> {
  static readonly kind: LocatedDomainExpressionKind = 'located_domain_expression';

  static components = {
    address: Construct.makeComponent({ name: 'address' }),
    domain: Construct.makeComponent({ name: 'domain' }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.address;
      yield this.domain;
    },
  };

  static isLocatedDomainExpression(o: unknown): o is LocatedDomainExpression {
    return (o as LocatedDomainExpression)?.kind === this.kind;
  }
}
