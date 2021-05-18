import {containerComponents, SpwContainerNode} from '../_abstract/container';
import {EssenceObjectiveDelimiter, EssenceSubjectiveDelimiter} from '@constructs/ast/nodes/containers/essence/delimiters';
import {SpwItemKind} from '@constructs/ast/_types/kind';
import {ConstructComponents} from '@constructs/ast/_abstract/spwConstruct';

export class Essence extends SpwContainerNode<'essence'> {
    static kind = 'essence' as SpwItemKind;

    static readonly openDelimiter = EssenceObjectiveDelimiter;

    static readonly closeDelimiter = EssenceSubjectiveDelimiter;

    static components: ConstructComponents = containerComponents(Essence);
}