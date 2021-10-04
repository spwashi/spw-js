import { EssenceNodeKind } from '@constructs/ast/nodes/containers/essence/__types';
import { EssenceIdentityOperator } from '@constructs/ast/nodes/containers/essence/_components/identity/construct';
import { EssenceSchemeOperator } from '@constructs/ast/nodes/containers/essence/_components/scheme/construct';
import { ConstructComponents } from '../../../_abstract/construct';
import { containerComponents, ContainerNode } from '../_abstract/container';

export class Essence extends ContainerNode<EssenceNodeKind> {
  static kind: EssenceNodeKind = 'essence_container';

  static readonly openDelimiter = EssenceSchemeOperator;

  static readonly closeDelimiter = EssenceIdentityOperator;

  static components: ConstructComponents = containerComponents(Essence);

  static isEssence(o: unknown): o is Essence {
    return (o as Essence)?.kind === this.kind;
  }
}
