import { containerComponents, ContainerNode } from '../_abstract/container';
import { DomainIdentityOperator } from '@constructs/ast/nodes/containers/domain/components/identity/construct';
import { ConstructComponents } from '../../../_abstract/construct';
import { DomainSchemeOperator } from '@constructs/ast/nodes/containers/domain/components/scheme/construct';
import { DomainNodeKind } from '@constructs/ast/nodes/containers/domain/__types';

export class Domain extends ContainerNode<DomainNodeKind> {
  static kind: DomainNodeKind = 'domain';

  static readonly openDelimiter = DomainSchemeOperator;

  static readonly closeDelimiter = DomainIdentityOperator;

  static components: ConstructComponents = containerComponents(Domain);
}
