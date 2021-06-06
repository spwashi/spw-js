import { containerComponents, SpwContainerNode } from '../_abstract/container';
import {
  EssenceObjectiveDelimiter,
  EssenceSubjectiveDelimiter,
} from '@constructs/ast/nodes/containers/essence/delimiters';
import { ConstructKind } from '@constructs/ast/_types/kind';
import { ConstructComponents } from '../../../_abstract/construct';

export class Essence extends SpwContainerNode<'essence'> {
  static kind = 'essence' as ConstructKind;

  static readonly openDelimiter = EssenceObjectiveDelimiter;

  static readonly closeDelimiter = EssenceSubjectiveDelimiter;

  static components: ConstructComponents = containerComponents(Essence);
}
