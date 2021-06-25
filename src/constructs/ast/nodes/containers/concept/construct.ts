import { containerComponents, ContainerNode } from '../_abstract/container';
import { ConceptualIdentityOperator } from '@constructs/ast/nodes/containers/concept/components/identity/construct';
import { ConstructComponents } from '../../../_abstract/construct';
import { ConceptSchemeOperator } from '@constructs/ast/nodes/containers/concept/components/scheme/construct';
import { ConceptNodeKind } from '@constructs/ast/nodes/containers/concept/__types';

export class Concept extends ContainerNode<ConceptNodeKind> {
  static kind: ConceptNodeKind = 'concept';

  static readonly openDelimiter = ConceptSchemeOperator;

  static readonly closeDelimiter = ConceptualIdentityOperator;

  static components: ConstructComponents = containerComponents(Concept);
}
