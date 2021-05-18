import {containerComponents, SpwContainerNode} from '../_abstract/container';
import {ConceptObjectiveDelimiter, ConceptSubjectiveDelimiter} from '@constructs/ast/nodes/containers/concept/delimiters';
import {SpwItemKind} from '@constructs/ast/_types/kind';
import {ConstructComponents} from '@constructs/ast/_abstract/spwConstruct';

export class Concept extends SpwContainerNode<'concept'> {
    static kind = 'concept' as SpwItemKind;

    static readonly openDelimiter = ConceptObjectiveDelimiter;

    static readonly closeDelimiter = ConceptSubjectiveDelimiter;

    static components: ConstructComponents = containerComponents(Concept);
}