import {SpwContainerNode} from '../_abstract/container';
import {DomainObjectiveDelimiter, DomainSubjectiveDelimiter} from '@constructs/ast/nodes/containers/domain/delimiters';

export class Domain extends SpwContainerNode<'domain'> {
    static kind                    = 'domain'
    static readonly openDelimiter  = DomainObjectiveDelimiter;
    static readonly closeDelimiter = DomainSubjectiveDelimiter;
}