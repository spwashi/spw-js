import {containerComponents, SpwContainerNode} from '../_abstract/container';
import {GroupObjectiveDelimiter, GroupSubjectiveDelimiter} from './delimiters';
import {ConstructKind} from '@constructs/ast/_types/kind';
import {ConstructComponents} from '@constructs/ast/_abstract/spwConstruct';

export class Group extends SpwContainerNode<'group'> {
    static kind = 'group' as ConstructKind;

    static readonly openDelimiter = GroupObjectiveDelimiter;

    static readonly closeDelimiter = GroupSubjectiveDelimiter;

    static components: ConstructComponents = containerComponents(Group);
}