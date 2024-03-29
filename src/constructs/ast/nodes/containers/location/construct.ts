import { LocationNodeKind } from '@constructs/ast/nodes/containers/location/__types';
import { LocationSchemeOperator } from '@constructs/ast/nodes/containers/location/_components/scheme/construct';
import { ConstructComponents } from '../../../_abstract/construct';
import { containerComponents, ContainerNode } from '../_abstract/container';
import { LocationIdentityOperator } from '@constructs/ast';

export class Location extends ContainerNode<LocationNodeKind> {
  static kind: LocationNodeKind = 'location_container';

  static readonly openDelimiter = LocationSchemeOperator;

  static readonly closeDelimiter = LocationIdentityOperator;

  static components: ConstructComponents = containerComponents(Location);

  static isLocation(o: unknown): o is Location {
    return (o as Location)?.kind === this.kind;
  }
}
