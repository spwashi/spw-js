import {SpwContainerNode} from '../_abstract/container';
import {GroupObjectiveDelimiter, GroupSubjectiveDelimiter} from './delimiters';
import {SpwItemKind} from '@constructs/ast/_types/kind';

export class Group extends SpwContainerNode<'group'> {
    static kind                    = 'group' as SpwItemKind;
    static readonly openDelimiter  = GroupObjectiveDelimiter;
    static readonly closeDelimiter = GroupSubjectiveDelimiter;
}