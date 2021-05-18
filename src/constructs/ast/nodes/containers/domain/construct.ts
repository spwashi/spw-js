import {SpwContainerNode} from '../_abstract/container';
import {DomainObjectiveDelimiter, DomainSubjectiveDelimiter} from '@constructs/ast/nodes/containers/domain/delimiters';
import {SpwItemKind} from '@constructs/ast/_types/kind';

export class Domain extends SpwContainerNode<'domain'> {
    static kind                    = 'domain' as SpwItemKind;
    static readonly openDelimiter  = DomainObjectiveDelimiter;
    static readonly closeDelimiter = DomainSubjectiveDelimiter;
}