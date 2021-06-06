import { containerComponents, SpwContainerNode } from '../_abstract/container';
import {
  ConceptObjectiveDelimiter,
  ConceptSubjectiveDelimiter,
} from '@constructs/ast/nodes/containers/concept/delimiters';
import { ConstructKind } from '@constructs/ast/_types/kind';
import { ConstructComponents } from '../../../_abstract/construct';

export class Concept extends SpwContainerNode<'concept'> {
  static kind = 'concept' as ConstructKind;

  static readonly openDelimiter = ConceptObjectiveDelimiter;

  static readonly closeDelimiter = ConceptSubjectiveDelimiter;

  static components: ConstructComponents = containerComponents(Concept);
}
