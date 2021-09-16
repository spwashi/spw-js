import { EssenceNodeKind } from '@constructs/ast/nodes/containers/essence/__types';
import { EssentialIdentityOperator } from '@constructs/ast/nodes/containers/essence/_components/identity/construct';
import { EssentialSchemeOperator } from '@constructs/ast/nodes/containers/essence/_components/scheme/construct';
import { ConstructComponents } from '../../../_abstract/construct';
import { containerComponents, ContainerNode } from '../_abstract/container';

export class Essence extends ContainerNode<EssenceNodeKind> {
  static kind: EssenceNodeKind = 'essence';

  static readonly openDelimiter = EssentialSchemeOperator;

  static readonly closeDelimiter = EssentialIdentityOperator;

  static components: ConstructComponents = containerComponents(Essence);

  static isEssence(o: unknown): o is Essence {
    return (o as Essence)?.kind === this.kind;
  }
}
