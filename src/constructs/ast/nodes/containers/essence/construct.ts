import { containerComponents, ContainerNode } from '../_abstract/container';
import { ConstructComponents } from '../../../_abstract/construct';
import { EssentialSchemeOperator } from '@constructs/ast/nodes/containers/essence/components/scheme/construct';
import { EssentialIdentityOperator } from '@constructs/ast/nodes/containers/essence/components/identity/construct';
import { EssenceNodeKind } from '@constructs/ast/nodes/containers/essence/__types';

export class Essence extends ContainerNode<EssenceNodeKind> {
  static kind: EssenceNodeKind = 'essence';

  static readonly openDelimiter = EssentialSchemeOperator;

  static readonly closeDelimiter = EssentialIdentityOperator;

  static components: ConstructComponents = containerComponents(Essence);
}
