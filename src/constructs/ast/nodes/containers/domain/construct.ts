import {containerComponents, SpwContainerNode} from '../_abstract/container';
import {DomainObjectiveDelimiter, DomainSubjectiveDelimiter} from '@constructs/ast/nodes/containers/domain/delimiters';
import {ConstructKind} from '@constructs/ast/_types/kind';
import {ConstructComponents} from '@constructs/ast/_abstract/spwConstruct';

export class Domain extends SpwContainerNode<'domain'> {
    static kind = 'domain' as ConstructKind;

    static readonly openDelimiter = DomainObjectiveDelimiter;

    static readonly closeDelimiter = DomainSubjectiveDelimiter;

    static components: ConstructComponents = containerComponents(Domain);
}