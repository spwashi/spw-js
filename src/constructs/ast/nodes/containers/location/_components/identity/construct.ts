import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  LocationIdentityKind,
  LocationIdentityOperatorToken,
} from '@constructs/ast/nodes/containers/location/_components/identity/__types';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { Delimiter } from '@constructs/ast/nodes/operators/semantic/_abstract/delimiter';
import { ConstructComponents, IConstructClass } from '../../../../../_abstract/construct';

type StaticType = IConstructClass<LocationIdentityKind> &
  ITokenOperatorClass<LocationIdentityOperatorToken>;

@staticImplements<StaticType>()
export class LocationIdentityOperator extends Delimiter<LocationIdentityKind> {
  static kind: LocationIdentityKind = 'location_identity';

  static token: LocationIdentityOperatorToken = ')';

  static components: ConstructComponents = operatorComponents(LocationIdentityOperator);
}
