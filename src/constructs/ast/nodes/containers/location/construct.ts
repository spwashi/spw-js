import { containerComponents, ContainerNode } from '../_abstract/container';
import { LocationalIdentityOperator } from './_components/identity/construct';
import { ConstructComponents } from '../../../_abstract/construct';
import { LocationalSchemeOperator } from '@constructs/ast/nodes/containers/location/_components/scheme/construct';
import { LocationNodeKind } from '@constructs/ast/nodes/containers/location/__types';

export class Location extends ContainerNode<LocationNodeKind> {
  static kind: LocationNodeKind = 'location';

  static readonly openDelimiter = LocationalSchemeOperator;

  static readonly closeDelimiter = LocationalIdentityOperator;

  static components: ConstructComponents = containerComponents(Location);

  static isLocation(o: unknown): o is Location {
    return (o as Location)?.kind === this.kind;
  }
}
