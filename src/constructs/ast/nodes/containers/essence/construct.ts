import {SpwContainerNode} from '../_abstract/container';
import {EssenceObjectiveDelimiter, EssenceSubjectiveDelimiter} from '@constructs/ast/nodes/containers/essence/delimiters';

export class Essence extends SpwContainerNode<'essence'> {
    static kind                    = 'essence';
    static readonly openDelimiter  = EssenceObjectiveDelimiter;
    static readonly closeDelimiter = EssenceSubjectiveDelimiter;
}