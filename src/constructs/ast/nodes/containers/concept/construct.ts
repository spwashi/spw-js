import {SpwContainerNode} from '../_abstract/container';
import {ConceptObjectiveDelimiter, ConceptSubjectiveDelimiter} from '@constructs/ast/nodes/containers/concept/delimiters';
import {SpwItemKind} from '@constructs/ast/_types/kind';

export class Concept extends SpwContainerNode<'concept'> {
    static kind                    = 'concept' as SpwItemKind;
    static readonly openDelimiter  = ConceptObjectiveDelimiter;
    static readonly closeDelimiter = ConceptSubjectiveDelimiter;
}