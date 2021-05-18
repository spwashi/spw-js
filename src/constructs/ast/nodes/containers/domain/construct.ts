import {containerComponents, SpwContainerNode} from '../_abstract/container';
import {DomainObjectiveDelimiter, DomainSubjectiveDelimiter} from '@constructs/ast/nodes/containers/domain/delimiters';
import {SpwItemKind} from '@constructs/ast/_types/kind';
import {ConstructComponents} from '@constructs/ast/_abstract/construct';

export class Domain extends SpwContainerNode<'domain'> {
    static kind = 'domain' as SpwItemKind;

    static readonly openDelimiter = DomainObjectiveDelimiter;

    static readonly closeDelimiter = DomainSubjectiveDelimiter;

    static components: ConstructComponents = containerComponents(Domain);
}