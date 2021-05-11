import {SpwContainerNode} from '../_abstract/container';
import {ConceptObjectiveDelimiter, ConceptSubjectiveDelimiter} from '@constructs/ast/nodes/containers/concept/delimiters';

export class Concept extends SpwContainerNode<'concept'> {
    static kind                    = 'concept';
    static readonly openDelimiter  = ConceptObjectiveDelimiter;
    static readonly closeDelimiter = ConceptSubjectiveDelimiter;
}