import {SpwContainerNode} from '../_abstract/container';
import {GroupObjectiveDelimiter, GroupSubjectiveDelimiter} from './delimiters';

export class Group extends SpwContainerNode<'group'> {
    static kind                    = 'group';
    static readonly openDelimiter  = GroupObjectiveDelimiter;
    static readonly closeDelimiter = GroupSubjectiveDelimiter;
}