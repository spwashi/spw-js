import { ConceptNodeKind } from '@constructs/ast/nodes/containers/concept/__types';
import { ConceptIdentityOperator } from '@constructs/ast/nodes/containers/concept/_components/identity/construct';
import { ConceptSchemeOperator } from '@constructs/ast/nodes/containers/concept/_components/scheme/construct';
import { ConstructComponents } from '../../../_abstract/construct';
import { containerComponents, ContainerNode } from '../_abstract/container';

export class Concept extends ContainerNode<ConceptNodeKind> {
  static kind: ConceptNodeKind = 'concept_container';

  static readonly openDelimiter = ConceptSchemeOperator;

  static readonly closeDelimiter = ConceptIdentityOperator;

  static components: ConstructComponents = containerComponents(Concept);

  static isConcept(o: unknown): o is Concept {
    return (o as Concept)?.kind === this.kind;
  }
}
