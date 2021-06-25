import { containerComponents, ContainerNode } from '../_abstract/container';
import { LocationalIdentityOperator } from './components/identity/construct';
import { ConstructComponents } from '../../../_abstract/construct';
import { LocationalSchemeOperator } from '@constructs/ast/nodes/containers/location/components/scheme/construct';
import { LocationNodeKind } from '@constructs/ast/nodes/containers/location/__types';

export class Location extends ContainerNode<LocationNodeKind> {
  static kind: LocationNodeKind = 'group';

  static readonly openDelimiter = LocationalSchemeOperator;

  static readonly closeDelimiter = LocationalIdentityOperator;

  static components: ConstructComponents = containerComponents(Location);
}
